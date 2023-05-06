import { axiosAuth } from '@/api/interseptor'

export const UserService = {
	async toggleFriend(id: string): Promise<number[]> {
		const { data } = await axiosAuth(`/friend/${id}`)
		return data
	},
}
