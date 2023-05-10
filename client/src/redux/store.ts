import { configureStore } from '@reduxjs/toolkit'

import { api } from './api/api'
import { userReducer } from './authUser/userAuth.slice'
import { getUsersReducer } from './getUsers/getUsers.slice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		getUsers: getUsersReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
