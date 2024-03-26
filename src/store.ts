import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './feature/commentSlice'
import userReducer from './feature/userSlice'

export const store = configureStore({
  reducer: {
    comments: commentReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
