import { configureStore } from '@reduxjs/toolkit'

import { api } from './api/api'
import { userReducer } from '@/redux/user/user.slice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
