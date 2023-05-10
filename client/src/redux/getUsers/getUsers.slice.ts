import { createSlice } from '@reduxjs/toolkit'

import { getAllUsers } from '@/redux/getUsers/getUsers.actions'
import { IUser } from '@/types/user.interface'

export interface IGetUsersState {
	users: IUser[]
	totalPages: number
	loading: boolean
}

const initialState: IGetUsersState = {
	users: [],
	totalPages: 0,
	loading: false,
}

const getUsersSlice = createSlice({
	name: 'getUsers',
	initialState,
	reducers: {
		clearFindUsers(state) {
			state.users = []
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
			state.users = [...state.users, ...payload.users]
			state.totalPages = payload.totalPages
			state.loading = false
		})
		builder.addCase(getAllUsers.pending, (state) => {
			state.loading = true
		})
	},
})

export const { reducer: getUsersReducer } = getUsersSlice

export const { clearFindUsers } = getUsersSlice.actions
