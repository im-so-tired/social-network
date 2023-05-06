import { createSlice } from '@reduxjs/toolkit'
import { IUserState } from '@/redux/user/userState.interface'
import { checkAuth, login, logout, register } from '@/redux/user/user.actions'
import { getValueLocalStorage } from '@/utils/localStorage'
import { errorMessage } from '@/utils/errorMessage'

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
