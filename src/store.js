import {persistStore, persistReducer} from 'redux-persist';
import {createSlice, configureStore, createSelector} from '@reduxjs/toolkit';
import storage from 'localforage';
import {format} from 'date-fns';

const persistConfig = {
  key: 'root',
  storage,
};

const emptyState = () => ({
  me: {name: '', email: '', token: ''},
  expenses: [],
  income: [],
  categories: {},
});

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    me: {name: '', email: '', token: ''},
    expenses: [],
    income: [],
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
      state.income = action.payload.income;
    },
    addExpense: (state, action) => {
      state.expenses = action.payload.map((ex) => ({
        ...ex,
        date: format(ex.date, 'yyyy-MM-dd'),
      }));
    },
    addIncome: (state, action) => {
      state.income = action.payload.map((inc) => ({
        ...inc,
        date: format(inc.date, 'yyyy-MM-dd'),
      }));
    },
    dropMe: () => {
      return emptyState();
    },
    deleteExpense: () => {},
  },
});

const persistedReducer = persistReducer(persistConfig, mainSlice.reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}),
});

let persistor = persistStore(store);

export const {dropMe, initMe, addExpense, initState, addIncome} = mainSlice.actions;

export const selectToken = (state) => state.me.token;
export const selectExpenses = (state) => state.expenses;
export const selectIncomes = (state) => state.income;
export const selectExpense = (id) =>
  createSelector([selectCategories, selectExpenses], (cat, exp) => {
    const expense = exp.find((ex) => ex.id === +id);
    if (!expense) return;
    const category = cat.find((obj) => obj.catId === +id)?.category || '';
    return {...expense, category};
  });

export const selectIncome = id =>
  createSelector([selectIncomes], (inc) => {
    const income = inc.find((inc) => inc.id === +id);
    if (!income) return;
    return income;
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

export {store, persistor};
