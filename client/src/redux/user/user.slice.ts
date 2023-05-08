import { createSlice } from '@reduxjs/toolkit'

import { errorMessage } from '@/utils/errorMessage'
import { getValueLocalStorage } from '@/utils/localStorage'

import { checkAuth, login, logout, register } from '@/redux/user/user.actions'
import { IUserState } from '@/redux/user/userState.interface'

const initialState: IUserState = {
	error: null,
	loading: false,
	user: getValueLocalStorage('user'),
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.loading = false
				state.user = payload.user
				state.error = null
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.loading = false
				state.user = null
				state.error = errorMessage(payload)
			})
			.addCase(login.pending, (state) => {
				state.loading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.loading = false
				state.user = payload.user
				state.error = null
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.loading = false
				state.user = null
				state.error = errorMessage(payload)
			})
			.addCase(logout.fulfilled, (state) => {
				state.loading = false
				state.user = null
			})
	},
})

export const { reducer: userReducer } = userSlice
