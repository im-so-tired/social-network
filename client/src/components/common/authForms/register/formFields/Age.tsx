import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

import { IRegisterForm } from '@/components/common/authForms/register/register.interface'
import AuthField from '@/components/ui/fields/authField/AuthField'

import styles from '../../form.module.scss'

const Age: FC<{ control: Control<IRegisterForm, any> }> = ({ control }) => {
	return (
		<Controller
			control={control}
			name="age"
			rules={{
				required: { value: true, message: 'Field is required!' },
				pattern: {
					value: /^[0-9]+$/,
					message: 'Wrong data format!',
				},
			}}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<AuthField
					label="Age"
					icon="MdPolicy"
					onChange={onChange}
					error={error}
					value={value}
					placeholder="Your age"
					className={styles.ageField}
				/>
			)}
		/>
	)
}

export default Age
