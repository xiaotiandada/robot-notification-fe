import { createReducer } from '@reduxjs/toolkit'
import { increment, decrement } from './actions'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

export default createReducer(initialState, (builder) => {
  builder.addCase(increment, (state, action) => {
    console.log('state', state)
    console.log('action', action)
    state.value = action.payload
  })
  builder.addCase(decrement, (state, action) => {
    state.value = action.payload
  })
})