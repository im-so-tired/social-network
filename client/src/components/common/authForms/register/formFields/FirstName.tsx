import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

import AuthField from '@/components/common/authForms/AuthField'
import { IRegisterForm } from '@/components/common/authForms/register/register.interface'

const FirstName: FC<{ control: Control<IRegisterForm, any> }> = ({
	control,
}) => {
	return (
		<Controller
			control={control}
			name="firstName"
			rules={{
				required: { value: true, message: 'Field is required!' },
				pattern: { value: /^[\p{L} -]+$/u, message: 'Wrong data format!' },
			}}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<AuthField
					label="First name"
					icon="MdPerson"
					onChange={onChange}
					error={error}
					value={value}
					placeholder="Your first name"
				/>
			)}
		/>
	)
}

export default FirstName
