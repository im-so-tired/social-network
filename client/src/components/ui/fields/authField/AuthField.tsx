import cn from 'classnames'
import React, { FC, InputHTMLAttributes, useRef, useState } from 'react'
import { FieldError } from 'react-hook-form'

import MaterialIcon from '@/components/ui/Icon'

import styles from './authField.module.scss'
import { IconTypes } from '@/types/icons.type'

interface IAuthField extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	icon?: IconTypes
	error?: FieldError
}

const AuthField: FC<IAuthField> = ({
	label,
	icon,
	error,
	className,
	...rest
}) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [focused, setFocused] = useState(false)

	const handleClick = () => {
		inputRef.current?.focus()
	}

	return (
		<div
			onClick={handleClick}
			className={cn(styles.field, className, {
				[styles.isFocused]: focused,
				[styles.errorBorder]: error,
			})}
		>
			<div>
				<span className="text-gray-800 block">{label}</span>
				<input
					ref={inputRef}
					{...rest}
					onBlur={() => setFocused(false)}
					onFocus={() => setFocused(true)}
				/>
			</div>
			{icon && <MaterialIcon name={icon} />}
			{error && <span className={styles.error}>{error.message}</span>}
		</div>
	)
}

export default AuthField
