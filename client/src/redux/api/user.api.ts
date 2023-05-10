import { api } from '@/redux/api/api'
import { IUser } from '@/types/user.interface'

const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getProfile: build.query<IUser, string>({
			query: (id) => `/user/${id}`,
			providesTags: (_result, error, id) => [{ type: 'User', id }],
		}),
		getAllUsers: build.query<IUser[], { page: number; searchTerm: string }>({
			query: ({ page, searchTerm }) =>
				`/user/all?limit=10&page=${page}&searchTerm=${searchTerm}`,
			// providesTags: (_result, error, { page }) => [{ type: 'User', id: page }],
		}),
		getFriends: build.query<IUser[], number[]>({
			query: (ids) => '/user/friends',
		}),
	}),
})

export const { useGetProfileQuery, useGetFriendsQuery } = userApi
