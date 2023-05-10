import { createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import thunk from 'redux-thunk'

import { AuthService } from '@/services/auth/auth.service'
import { UserService } from '@/services/user.service'

import { errorMessage } from '@/utils/errorMessage'

import { IAuthResponse, IEmailPassword } from '@/types/auth.interface'
import { IUser } from '@/types/user.interface'

export const register = createAsyncThunk<IAuthResponse, FormData>(
	'auth/register',
	async (data: FormData, thunkApi) => {
		const toastId = toast.loading('Register...')
		try {
			const response = await AuthService.register(data)
			toast.dismiss(toastId)
			toast.success('Registration completed successfully')
			return response.data
		} catch (error) {
			toast.dismiss(toastId)
			throw thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async (data: IEmailPassword, thunkApi) => {
		const toastId = toast.loading('Login...')
		try {
			const response = await AuthService.login(data)
			toast.dismiss(toastId)
			toast.success('Login successful')
			return response.data
		} catch (error) {
			toast.dismiss(toastId)
			throw thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', () => {
	AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/checkAuth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
			throw thunkApi.rejectWithValue(error)
		}
	}
)

export const toggleFriend = createAsyncThunk<number[], number>(
	'user/friend',
	async (friendId: number, thunkApi) => {
		try {
			const newFriends = await UserService.toggleFriend(friendId)
			return newFriends.data
		} catch (error) {
			toast.error(errorMessage(error))
			throw thunkApi.rejectWithValue(error)
		}
	}
)
