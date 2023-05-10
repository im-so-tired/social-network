import { api } from '@/redux/api/api'
import { IPost } from '@/types/post.interface'

const postsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUserPost: build.query<IPost[], number>({
			query: (userId) => `/posts/user/${userId}`,
			providesTags: (result = []) => [
				...result.map(({ id }) => ({ type: 'Posts', id } as const)),
				{ type: 'Posts' as const, id: 'LIST' },
			],
		}),
		toggleLike: build.mutation<IPost, number>({
			query: (id) => ({
				url: `/posts/like/${id}`,
				method: 'PATCH',
			}),
			invalidatesTags: (_result, error, id) => [{ type: 'Posts', id }],
		}),
		createPost: build.mutation<IPost, FormData>({
			query: (data: FormData) => ({
				url: `/posts`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: (_result) => ['Posts'],
		}),
		getFriendsPosts: build.query<IPost[], number[]>({
			query: () => `/user/posts/friends`,
			providesTags: (result = []) => [
				...result.map(({ id }) => ({ type: 'Posts', id } as const)),
			],
		}),
	}),
})

export const {
	useGetUserPostQuery,
	useToggleLikeMutation,
	useCreatePostMutation,
	useGetFriendsPostsQuery,
} = postsApi
