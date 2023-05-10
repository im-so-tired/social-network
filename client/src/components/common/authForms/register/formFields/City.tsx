import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

import AuthField from '@/components/common/authForms/AuthField'
import { IRegisterForm } from '@/components/common/authForms/register/register.interface'

import styles from '../../form.module.scss'

const City: FC<{ control: Control<IRegisterForm, any> }> = ({ control }) => {
	return (
		<Controller
			control={control}
			name="city"
			rules={{
				pattern: { value: /^[\p{L} -]+$/u, message: 'Wrong data format!' },
			}}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<AuthField
					label="City"
					icon="MdLocationPin"
					onChange={onChange}
					error={error}
					value={value}
					placeholder="Your city"
					className={styles.cityField}
				/>
			)}
		/>
	)
}

export default City
