import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
