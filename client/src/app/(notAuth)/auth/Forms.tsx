'use client'

import React, { FC, useState } from 'react'

import LoginForm from '@/components/common/authForms/login/LoginForm'
import RegisterForm from '@/components/common/authForms/register/RegisterForm'

import styles from './forms.module.scss'
import { useAuthRedirect } from '@/app/(notAuth)/auth/useAuthRedirect'

const AuthForms: FC = () => {
	const [isRegistration, setIsRegistration] = useState(false)
	useAuthRedirect()
	const toggleForm = () => {
		setIsRegistration(!isRegistration)
	}
	return (
		<article className={styles.formsContainer}>
			<div>
				{isRegistration ? (
					<RegisterForm toggleForm={toggleForm} />
				) : (
					<LoginForm toggleForm={toggleForm} />
				)}
			</div>
		</article>
	)
}

export default AuthForms
