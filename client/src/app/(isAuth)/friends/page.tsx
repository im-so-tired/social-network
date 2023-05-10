'use client'

import { Skeleton } from '@mui/material'
import { NextPage } from 'next'

import Heading from '@/components/ui/heading/Heading'
import User from '@/components/ui/user/User'

import { useAppSelector } from '@/hooks/redux'

import { useGetFriendsQuery } from '@/redux/api/user.api'

const Friends: NextPage = () => {
	const friends = useAppSelector((state) => state.user.user?.friends)
	const { data: users, isLoading } = useGetFriendsQuery(friends || [])
	const isNotFriends = !isLoading && !users?.length
	return (
		<div>
			<div className="island p-8">
				<Heading className="mb-2">Friends</Heading>
				<div className="flex flex-col gap-4 mt-4">
					{isNotFriends ? <h4>Add users as friends to see them here</h4> : null}
					{isLoading
						? new Array(6).map((_, i) => (
								<Skeleton variant="rounded" height={415} key={i} />
						  ))
						: users?.map((user) => <User key={user.id} user={user} />)}
				</div>
			</div>
		</div>
	)
}

export default Friends
