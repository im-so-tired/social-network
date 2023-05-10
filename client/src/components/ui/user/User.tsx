import React, { FC, memo } from 'react'

import ToggleFriendBtn from '@/components/common/profileInfo/ToggleFriendBtn'
import Avatar from '@/components/ui/avatar/Avatar'

import { useAppSelector } from '@/hooks/redux'

import { IUser } from '@/types/user.interface'

const User: FC<{ user: IUser }> = memo(({ user }) => {
	const id = useAppSelector((state) => state.user.user?.id)
	const isMyProfile = id === user.id
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center">
				<Avatar alt="avatar" src={user.avatarPath} size={80} />
				<p className="ml-5">
					{user.firstName} {user.lastName}
				</p>
			</div>
			{!isMyProfile ? <ToggleFriendBtn id={user.id} /> : null}
		</div>
	)
})
User.displayName = 'User row'
export default User
