import React, { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import LoginFormHeader from '@/components/common/authForms/login/RegisterFormHeader'
import ButtonPrimary from '@/components/ui/buttonPrimary/ButtonPrimary'
import AuthField from '@/components/ui/fields/authField/AuthField'

import { useAppSelector } from '@/hooks/redux'
import { useActions } from '@/hooks/useActions'

import styles from '../form.module.scss'

import { IEmailPassword } from '@/types/auth.interface'

const LoginForm: FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
	const { error, loading } = useAppSelector((state) => state.user)
	const { login } = useActions()
	const { control, handleSubmit, setError } = useForm<IEmailPassword>({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	useEffect(() => {
		if (loading || !error) return
		const emailError = 'User not found'
		const passwordError = 'Wrong password'
		if (error === emailError) setError('email', { message: emailError })
		else if (error === passwordError) {
			setError('password', { message: passwordError })
		}
	}, [error, loading, setError])

	const onSubmit = async (data: IEmailPassword) => {
		login(data)
	}

	return (
		<div>
			<LoginFormHeader toggleForm={toggleForm} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="email"
					control={control}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<AuthField
							label="Email"
							icon="MdEmail"
							value={value}
							error={error}
							onChange={onChange}
							placeholder="Your email"
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<AuthField
							label="Password"
							icon="MdPassword"
							value={value}
							error={error}
							onChange={onChange}
							placeholder="Your password"
						/>
					)}
				/>
				<footer className={styles.footer}>
					<ButtonPrimary>Login</ButtonPrimary>
				</footer>
			</form>
		</div>
	)
}

export default LoginForm
