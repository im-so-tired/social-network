import { api } from '@/redux/api/api'
import { IUser } from '@/types/user.interface'

const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getProfile: build.query<IUser, string>({
			query: (id) => `/user/${id}`,
			providesTags: (_result, error, id) => [{ type: 'User', id }],
		}),
		// toggleFriend: build.mutation<IUser, number>({
		// 	query(id) {
		// 		return {
		// 			url: `/user/friend/${id}`,
		// 			method: 'PATCH',
		// 		}
		// 	},
		// 	invalidatesTags: (_result, error, id) => [{ type: 'User', id }],
		// }),
	}),
})

export const { useGetProfileQuery } = userApi
