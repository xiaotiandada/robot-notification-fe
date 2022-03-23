import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { save, load } from "redux-localstorage-simple"

import counter from './counter/reducer'
import global from './global/reducer'

const PERSISTED_KEYS: string[] = ['global']

const store = configureStore({
  reducer: {
    global,
    counter,
  },
  middleware: [...getDefaultMiddleware(), logger, save({ states: PERSISTED_KEYS })],
  devTools: true,
  preloadedState: load({ states: PERSISTED_KEYS }),
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
