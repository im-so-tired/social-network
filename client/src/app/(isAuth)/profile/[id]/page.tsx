'use client'

import { Skeleton } from '@mui/material'
import { NextPage } from 'next'

import PostCreateForm from '@/components/common/postCreateForm/PostCreateForm'
import ProfileInfo from '@/components/common/profileInfo/ProfileInfo'
import Heading from '@/components/ui/heading/Heading'
import Post from '@/components/ui/post/Post'

import { useAppSelector } from '@/hooks/redux'

import { useProfile } from '@/app/(isAuth)/profile/[id]/useProfile'

const Profile: NextPage = () => {
	const { sorterPosts, user, isLoading, isError } = useProfile()
	const authId = useAppSelector((state) => state.user.user?.id)
	if (isLoading)
		return (
			<div>
				<Skeleton variant="rounded" height={415} />
				<div className="flex gap-4 mt-4">
					<div className="w-[60%]">
						<Skeleton variant="rounded" height={420} />
					</div>
					<div className="flex-grow">
						<Skeleton variant="rounded" height={420} />
					</div>
				</div>
			</div>
		)
	if (isError || !user) return <Heading>Error</Heading>
	const isMyProfile = authId === user.id
	return (
		<>
			<ProfileInfo isMyProfile={isMyProfile} user={user} />
			<div className="flex">
				<div className="w-[60%]">
					{isMyProfile && <PostCreateForm />}
					<section>
						{isMyProfile && !sorterPosts.length ? (
							<div className="island p-6 mt-4">
								<h4 className="text-lg font-medium">
									Write posts and they will appear here
								</h4>
							</div>
						) : null}
						{sorterPosts.map((post) => (
							<Post key={post.lastUpdate} post={post} />
						))}
					</section>
				</div>
				<section></section>
			</div>
		</>
	)
}

export default Profile
