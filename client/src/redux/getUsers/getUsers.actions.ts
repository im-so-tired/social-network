import { createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import { UserService } from '@/services/user.service'

import { errorMessage } from '@/utils/errorMessage'

import { IUser } from '@/types/user.interface'

export const getAllUsers = createAsyncThunk<
	{ users: IUser[]; totalPages: number },
	{ page: number; searchTerm: string }
>('user/all', async ({ page, searchTerm }, thunkApi) => {
	try {
		const users = await UserService.getAllUsers(page, searchTerm)
		return users.data
	} catch (error) {
		toast.error(errorMessage(error))
		throw thunkApi.rejectWithValue(error)
	}
})
