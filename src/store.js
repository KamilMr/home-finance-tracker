import {createSlice, configureStore, createSelector} from '@reduxjs/toolkit';
import {format} from 'date-fns';

const authService = () => {};

const counterSlice = createSlice({
  name: 'main',
  initialState: {
    me: {name: '', email: '', token: ''},
    expenses: [],
    categories: {},
  },
  reducers: {
    initMe: (state, action) => {
      const {name = '', email, token} = action.payload;
      Object.assign(state.me, {name, email, token});
    },
    initState: (state, action) => {
      state.expenses = action.payload.expenses.map((ex) => ({
        ...ex,
        date: format(ex.date, 'yyyy-MM-dd'),
      }));
      state.categories = action.payload.categories;
    },
    addExpense: (state, action) => {
      state.expenses = action.payload.map((ex) => ({
        ...ex,
        date: format(ex.date, 'yyyy-MM-dd'),
      }));
    },
    dropMe: (state) => {
      state.me = {name: '', email: '', token: ''};
    },
    deleteExpense: () => {},
  },
});

export const {dropMe, initMe, addExpense, initState} = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: authService,
      },
    }),
});

export const selectToken = (state) => state.me.token;
export const selectExpenses = (state) => state.expenses;
export const selectExpense = (id) =>
  createSelector([selectCategories, selectExpenses], (cat, exp) => {
    const expense = exp.find((ex) => ex.id === +id);
    if (!expense) return;
    const category = cat.find((obj) => obj.catId === +id)?.category || '';
    return {...expense, category};
  });

export const selectCategories = createSelector(
  [(state) => state.categories],
  (cat) => {
    const arr = Object.values(cat);
    return arr.reduce((pv, cv) => {
      if (Array.isArray(pv)) pv.push(...cv.categories);
      return pv;
    }, []);
  },
);

export const selectMe = (state) => state.me;

export default store;
