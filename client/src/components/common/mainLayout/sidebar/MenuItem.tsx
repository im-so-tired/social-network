import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC } from 'react'

import { IMenuData } from '@/components/common/mainLayout/sidebar/menu.data'
import MaterialIcon from '@/components/ui/Icon'

import styles from './sidebar.module.scss'

const MenuItem: FC<{ data: IMenuData }> = ({ data }) => {
	const { icon, link, title } = data
	const pathname = usePathname()
	const isActive = pathname === link
	return (
		<li className={cn(styles.menuItem, { [styles.active]: isActive })}>
			<Link href={link}>
				<div>
					<MaterialIcon name={icon} color={isActive ? '#1877F2' : undefined} />
					<span>{title}</span>
				</div>
			</Link>
		</li>
	)
}

export default MenuItem
