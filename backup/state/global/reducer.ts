import { createReducer } from "@reduxjs/toolkit";
import { updateDarkMode } from "./actions";

interface GlobalState {
  darkMode: boolean
  timestamp: number
}

const currentTimestamp = () => new Date().getTime()

const initialState: GlobalState = {
  // TODO 考虑把 darkMode 放到 user 中使用
  darkMode: false,
  timestamp: currentTimestamp()
}

export default createReducer(initialState, (builder) => {
  builder.addCase(updateDarkMode, (state, action) => {
    state.darkMode = action.payload.darkMode
    state.timestamp = currentTimestamp()
  })
})