import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, memo } from 'react'

import MaterialIcon from '@/components/ui/Icon'
import Avatar from '@/components/ui/avatar/Avatar'

import { useAppSelector } from '@/hooks/redux'

import styles from './post.module.scss'
import { IMAGE_URL } from '@/api/interseptor'
import { useToggleLikeMutation } from '@/redux/api/posts.api'
import { IPost } from '@/types/post.interface'

const Post: FC<{ post: IPost }> = memo(({ post }) => {
	const [likePost, { isLoading }] = useToggleLikeMutation()
	const userId = useAppSelector((state) => state.user.user?.id)
	const isLiked = post.likes.some((like) => like === userId)
	return (
		<div className={styles.post}>
			<header>
				<Link href={`/profile/${post.author.id}`}>
					<Avatar alt="avatar" src={post.author.avatarPath} size={40} />
					<div>
						<span className="font-medium">
							{post.author.firstName} {post.author.lastName}
						</span>
						<br />
						<span className="text-gray-500">
							{moment(new Date(post.lastUpdate)).format('D MMM YYYY')}
						</span>
					</div>
				</Link>
			</header>
			<section>
				<h5 className={styles.title}>{post.title}</h5>
				<p>{post.message}</p>
				{post.image && (
					<Image
						src={`${IMAGE_URL}/${post.image}`}
						alt="post img"
						width={400}
						height={200}
						layout="responsive"
					/>
				)}
				<button
					disabled={isLoading}
					onClick={() => likePost(post.id)}
					className="flex items-center mt-2 cursor-pointer"
				>
					<MaterialIcon
						name="MdFavorite"
						color={isLiked ? '#FF0000' : undefined}
					/>
					<span className="ml-1">{post.likes.length}</span>
				</button>
			</section>
		</div>
	)
})
Post.displayName = 'Post'
export default Post
