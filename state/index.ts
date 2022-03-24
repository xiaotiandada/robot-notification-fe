import { useMemo } from 'react'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {combineReducers} from "redux"; 
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import counter from './counter/reducer'
import global from './global/reducer'

// Next reduxjs/toolkit redux-persist
// https://github.com/nus3/inside-podcast/blob/b46f43e55a/src/store/index.ts

// HACK: `redux-persist failed to create sync storage. falling back to noop storage.`の対応
// https://github.com/vercel/next.js/discussions/15687#discussioncomment-45319
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: any) {
      return Promise.resolve()
    },
  }
}

const PERSISTED_KEYS: string[] = ['global']

export const STORE_KEY = 'root'

const storage =
  typeof window !== 'undefined'
    ? createWebStorage("local")
    : createNoopStorage()

const persistConfig = {
  key: STORE_KEY,
  version: 1,
  storage: storage,
  whitelist: PERSISTED_KEYS
}

const reducers = combineReducers({
  global,
  counter,           
 });

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),logger],
  devTools: true,
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch