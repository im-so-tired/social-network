'use client'

import { Skeleton } from '@mui/material'
import { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'
import Post from '@/components/ui/post/Post'

import { useAppSelector } from '@/hooks/redux'

import { useGetFriendsPostsQuery } from '@/redux/api/posts.api'

const array = [1, 2, 3, 4, 5]
const Feed: FC = () => {
	const friends = useAppSelector((state) => state.user.user?.friends)
	const { data: posts, isLoading } = useGetFriendsPostsQuery(friends || [])

	return (
		<div>
			<Heading>Feed</Heading>
			<div className="w-[60%]">
				{isLoading
					? array.map((_, i) => (
							<Skeleton
								className="mt-4"
								variant="rounded"
								height={415}
								key={i}
							/>
					  ))
					: posts?.map((post) => <Post key={post.id} post={post} />)}
			</div>
		</div>
	)
}

export default Feed
