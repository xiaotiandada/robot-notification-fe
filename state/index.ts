import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counter from './counter/reducer'
import logger from 'redux-logger'
import { save, load } from "redux-localstorage-simple"

const PERSISTED_KEYS: string[] = []

const store = configureStore({
  reducer: {
    counter
  },
  middleware: [...getDefaultMiddleware(), logger, save({ states: PERSISTED_KEYS })],
  devTools: true,
  preloadedState: load({ states: PERSISTED_KEYS }),
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
