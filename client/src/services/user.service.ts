import { AxiosResponse } from 'axios'

import { axiosAuth } from '@/api/interseptor'
import { IUser } from '@/types/user.interface'

export const UserService = {
	async toggleFriend(id: number): Promise<AxiosResponse<number[]>> {
		return await axiosAuth.patch(`/user/friend/${id}`)
	},

	async getAllUsers(
		page: number,
		searchTerm: string
	): Promise<AxiosResponse<{ users: IUser[]; totalPages: number }>> {
		return await axiosAuth('/user/all', {
			params: {
				page,
				searchTerm,
				limit: 10,
			},
		})
	},

	async getFriends(): Promise<AxiosResponse<IUser[]>> {
		return await axiosAuth('/user/friends', {})
	},
}
