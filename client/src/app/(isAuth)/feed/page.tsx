'use client'

import React, { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'
import Post from '@/components/ui/post/Post'

import { useGetFriendsPostsQuery } from '@/redux/api/posts.api'

const Feed: FC = () => {
	const { data: posts, isLoading } = useGetFriendsPostsQuery(null)
	return (
		<div>
			<Heading>Feed</Heading>
			<div className="w-[60%]">
				{isLoading || !posts.length ? (
					<h2>Loading</h2>
				) : (
					posts.map((post) => <Post key={post.id} post={post} />)
				)}
			</div>
		</div>
	)
}

export default Feed
