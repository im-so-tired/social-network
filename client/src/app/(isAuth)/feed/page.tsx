'use client'

import React, { FC, useEffect } from 'react'

import Heading from '@/components/ui/heading/Heading'
import Post from '@/components/ui/post/Post'

import { useAppSelector } from '@/hooks/redux'

import { useGetFriendsPostsQuery } from '@/redux/api/posts.api'

const Feed: FC = () => {
	const friends = useAppSelector((state) => state.user.user?.friends)
	const { data: posts, isLoading } = useGetFriendsPostsQuery(friends || [])

	return (
		<div>
			<Heading>Feed</Heading>
			<div className="w-[60%]">
				{isLoading ? (
					<h2>Loading</h2>
				) : (
					posts?.map((post) => <Post key={post.id} post={post} />)
				)}
			</div>
		</div>
	)
}

export default Feed
