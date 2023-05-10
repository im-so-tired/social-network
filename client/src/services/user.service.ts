import { AxiosResponse } from 'axios'

import { axiosAuth } from '@/api/interseptor'
import { IAuthResponse } from '@/types/auth.interface'

export const UserService = {
	async toggleFriend(id: number): Promise<AxiosResponse<number[]>> {
		return await axiosAuth.patch(`/user/friend/${id}`)
	},
}
