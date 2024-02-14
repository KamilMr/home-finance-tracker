import {createSlice, configureStore} from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'main',
  initialState: {
    me: {name: '', email: '', token: ''},
  },
  reducers: {
    initMe: (state, action) => {
      const {name, email, token} = action.payload;
      state.me = {name, email, token};
    },
    dropMe: state => {
      state.me = {name: '', email: '', token: ''};
    }
  }
})

export const {dropMe} = counterSlice.actions

const store = configureStore({
  reducer: counterSlice.reducer
})

export const selectToken = state => state.me.token;
export const selectMe = state => state.me;

export default store;

