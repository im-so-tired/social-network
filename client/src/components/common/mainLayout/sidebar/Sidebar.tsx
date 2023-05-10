'use client'

import React, { FC } from 'react'

import MenuItem from '@/components/common/mainLayout/sidebar/MenuItem'
import { menuData } from '@/components/common/mainLayout/sidebar/menu.data'

import { useAppSelector } from '@/hooks/redux'

import styles from './sidebar.module.scss'

const Sidebar: FC = () => {
	const id = useAppSelector((state) => state.user.user?.id)
	return (
		<aside className={styles.sidebar}>
			<ul className={styles.menu}>
				<MenuItem
					data={{ title: 'Home', link: `/profile/${id}`, icon: 'MdHome' }}
					key={`/profile/${id}`}
				/>
				{menuData.map((menuItem) => (
					<MenuItem key={menuItem.link} data={menuItem} />
				))}
			</ul>
		</aside>
	)
}

export default Sidebar
