'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'

import Avatar from '@/components/ui/avatar/Avatar'
import DropDown from '@/components/ui/dropDown/DropDown'

import { useAppSelector } from '@/hooks/redux'
import { useActions } from '@/hooks/useActions'

const Profile: FC = () => {
	const id = useAppSelector((state) => state.user.user?.id)
	const avatarPath = useAppSelector((state) => state.user.user?.avatarPath)
	const firstName = useAppSelector((state) => state.user.user?.firstName)
	const lastName = useAppSelector((state) => state.user.user?.lastName)

	const { push } = useRouter()
	const { logout } = useActions()
	return (
		<div className="relative">
			<DropDown
				options={[
					{ label: 'My profile', onClick: () => push(`/profile/${id}`) },
					{ label: 'Logout', onClick: () => logout() },
				]}
				className="w-[130px]"
			>
				<button>
					<div className="flex items-center">
						<Avatar
							alt="avatar"
							src={avatarPath!}
							size={40}
							className="mr-2.5"
						/>
						<span>
							{firstName} {lastName}
						</span>
					</div>
				</button>
			</DropDown>
		</div>
	)
}

export default Profile
