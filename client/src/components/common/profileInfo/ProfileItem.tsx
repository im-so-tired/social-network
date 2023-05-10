import React, { FC } from 'react'

import MaterialIcon from '@/components/ui/Icon'

import styles from './profileInfo.module.scss'
import { IconTypes } from '@/types/icons.type'

interface IProfileItem {
	title: string
	data: string | number
	icon?: IconTypes
}

const ProfileItem: FC<IProfileItem> = ({ data, title, icon }) => {
	return (
		<div className={styles.profileItem}>
			<h5>
				{icon && <MaterialIcon name={icon} size={20} />} {title}
			</h5>
			<span>{data}</span>
		</div>
	)
}

export default ProfileItem
