import cn from 'classnames'
import Image from 'next/image'
import { FC } from 'react'

import styles from './avatar.module.scss'
import { AVATAR_URL } from '@/api/interseptor'

interface IAvatar {
	alt: string
	src: string
	onClick?: () => void
	size: number
	className?: string
}

const Avatar: FC<IAvatar> = ({ size, className, ...rest }) => {
	return (
		<div
			className={cn(
				`flex-shrink-0 relative overflow-hidden`,
				className,
				styles.avatar
			)}
			style={{
				width: `${size}px`,
				height: `${size}px`,
			}}
		>
			<Image
				{...rest}
				src={`${AVATAR_URL}/${rest.src}`}
				fill
				// sizes={`${size}px`}
			/>
		</div>
	)
}

export default Avatar
