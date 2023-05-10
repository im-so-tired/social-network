import React, { FC, memo } from 'react'

import ProfileItem from '@/components/common/profileInfo/ProfileItem'
import ToggleFriendBtn from '@/components/common/profileInfo/ToggleFriendBtn'
import Avatar from '@/components/ui/avatar/Avatar'

import { useAppSelector } from '@/hooks/redux'

import styles from './profileInfo.module.scss'
import { IUser } from '@/types/user.interface'

const ProfileInfo: FC<{
	user: IUser
	isMyProfile: boolean
}> = memo(({ user, isMyProfile }) => {
	const id = useAppSelector((state) => state.user.user?.id)

	return (
		<section className={styles.profileInfo}>
			<div className={styles.header} />
			<div className={styles.infoContainer}>
				<div className={styles.avatar}>
					<Avatar alt="avatar" src={user.avatarPath} size={120} />
				</div>
				{!isMyProfile ? <ToggleFriendBtn id={user.id} /> : null}
				<h3 className="text-xl font-bold">
					{user.firstName} {user.lastName}
				</h3>
				<div className={styles.info}>
					<ProfileItem title="Age" data={user.age} />
					{user.gender && (
						<ProfileItem
							title="Gender"
							data={user.gender}
							icon={user.gender === 'female' ? 'MdFemale' : 'MdMale'}
						/>
					)}
					{user.city && <ProfileItem title="City" data={user.city} />}
					{user.university && (
						<ProfileItem
							title="University"
							data={user.university}
							icon="MdSchool"
						/>
					)}
					<ProfileItem title="Email" data={user.email} icon="MdEmail" />
				</div>
			</div>
		</section>
	)
})
ProfileInfo.displayName = 'ProfileInfo'
export default ProfileInfo
