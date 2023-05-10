import { useParams } from 'next/navigation'

import { useGetUserPostQuery } from '@/redux/api/posts.api'
import { useGetProfileQuery } from '@/redux/api/user.api'

export const useProfile = () => {
	const { id } = useParams()
	const {
		data: user,
		isLoading: userLoading,
		isError: userError,
	} = useGetProfileQuery(id)
	const {
		data: posts,
		isLoading: postsLoading,
		isError: postsError,
	} = useGetUserPostQuery(+id)
	const isLoading = userLoading || postsLoading
	const isError = userError || postsError
	const sorterPosts = posts
		? [...posts].sort((a, b) => b.lastUpdate - a.lastUpdate)
		: []
	return { user, sorterPosts, isLoading, isError }
}
