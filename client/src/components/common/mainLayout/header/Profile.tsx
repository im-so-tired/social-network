'use client'

import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

import Avatar from '@/components/ui/avatar/Avatar'
import DropDown from '@/components/ui/dropDown/DropDown'

import { useAppSelector } from '@/hooks/redux'
import { useActions } from '@/hooks/useActions'

const Profile: FC = () => {
	const user = useAppSelector((state) => state.user.user)
	const { push } = useRouter()
	const { logout } = useActions()
	return (
		<div className="relative">
			<DropDown
				options={[
					{ label: 'My profile', onClick: () => push(`/profile/${user?.id}`) },
					{ label: 'Logout', onClick: () => logout() },
				]}
				className="w-[130px]"
			>
				<button>
					<div className="flex items-center">
						<Avatar
							alt="avatar"
							src={user?.avatarPath!}
							size={40}
							className="mr-2.5"
						/>
						<span>
							{user?.firstName} {user?.lastName}
						</span>
					</div>
				</button>
			</DropDown>
		</div>
	)
}

export default Profile
