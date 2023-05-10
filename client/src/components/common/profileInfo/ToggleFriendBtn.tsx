import React, { FC } from 'react'

import styles from '@/components/common/profileInfo/profileInfo.module.scss'
import ButtonPrimary from '@/components/ui/buttonPrimary/ButtonPrimary'

import { useAppSelector } from '@/hooks/redux'
import { useActions } from '@/hooks/useActions'

const ToggleFriendBtn: FC<{ id: number }> = ({ id }) => {
	const myFriends = useAppSelector((state) => state.user.user?.friends)
	const { toggleFriend } = useActions()
	const inFriends = myFriends?.some((fr) => fr === id)
	return (
		<ButtonPrimary
			className={styles.toggleFriendBtn}
			onClick={() => toggleFriend(id)}
		>
			{inFriends ? 'Remove Friend' : 'Add Friend'}
		</ButtonPrimary>
	)
}

export default ToggleFriendBtn
