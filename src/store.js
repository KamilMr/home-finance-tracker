import {createSlice, configureStore} from '@reduxjs/toolkit'

const authService = () => {};

const counterSlice = createSlice({
  name: 'main',
  initialState: {
    me: {name: '', email: '', token: ''},
    expenses: [],
  },
  reducers: {
    initMe: (state, action) => {
      const {name = '', email, token} = action.payload;
      Object.assign(state.me, {name, email, token});
    },
    addExpense: (state, action) => {
      state.expenses = action.payload;
    },
    dropMe: state => {
      state.me = {name: '', email: '', token: ''};
    }
  }
})

export const {dropMe, initMe, addExpense} = counterSlice.actions

const store = configureStore({
  reducer: counterSlice.reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: authService,
      }
    })
});

export const selectToken = state => state.me.token;
export const selectExpenses = state => state.expenses;
export const selectMe = state => state.me;

export default store;

