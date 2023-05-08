import { ChangeEvent, FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import RegisterFormHeader from '@/components/common/authForms/register/RegisterFormHeader'
import {
	Age,
	AvatarField,
	City,
	Email,
	FirstName,
	GenderChoice,
	LastName,
	Password,
	University,
} from '@/components/common/authForms/register/formFields'
import { IRegisterForm } from '@/components/common/authForms/register/register.interface'
import ButtonPrimary from '@/components/ui/buttonPrimary/ButtonPrimary'

import { useAppSelector } from '@/hooks/redux'
import { useActions } from '@/hooks/useActions'

import styles from '../form.module.scss'

const RegisterForm: FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
	const { register } = useActions()
	const { error } = useAppSelector((state) => state.user)
	const { control, handleSubmit, setError, clearErrors } =
		useForm<IRegisterForm>({
			defaultValues: {
				gender: 'female',
				firstName: '',
				email: '',
				age: '',
				city: '',
				lastName: '',
				password: '',
				university: '',
				avatar: null,
			},
		})

	const emailError = 'User with this email is already in the system!'
	if (error === emailError) {
		setError('email', {
			message: emailError,
		})
	} else {
		clearErrors('email')
	}
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const onSubmit = async (textData: IRegisterForm) => {
		const data = {
			...textData,
			avatar: selectedFile,
		}
		const formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (value) formData.append(key, value)
		}
		register(formData)
	}
	const avatarChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedFile(e.target.files[0])
		}
	}
	return (
		<div>
			<RegisterFormHeader toggleForm={toggleForm} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<AvatarField selectedFile={selectedFile} onChange={avatarChange} />
				<div className="flex gap-11">
					<FirstName control={control} />
					<LastName control={control} />
				</div>
				<div className="flex-center gap-11 mt-4">
					<Age control={control} />
					<City control={control} />
					<GenderChoice control={control} />
				</div>
				<University control={control} />
				<Email control={control} />
				<Password control={control} />
				<div></div>
				<footer className={styles.footer}>
					<ButtonPrimary>Create account</ButtonPrimary>
				</footer>
			</form>
		</div>
	)
}

export default RegisterForm
