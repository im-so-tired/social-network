import cn from 'classnames'
import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import styles from './buttonPrimary.module.scss'

interface IButtonPrimary extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonPrimary: FC<PropsWithChildren<IButtonPrimary>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<button {...rest} className={cn(className, styles.btnPrimary)}>
			{children}
		</button>
	)
}

export default ButtonPrimary
