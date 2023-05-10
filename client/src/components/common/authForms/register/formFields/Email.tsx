import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

import AuthField from '@/components/common/authForms/AuthField'
import { IRegisterForm } from '@/components/common/authForms/register/register.interface'

const EmailField: FC<{ control: Control<IRegisterForm, any> }> = ({
	control,
}) => {
	return (
		<Controller
			control={control}
			name="email"
			rules={{
				required: { value: true, message: 'Field is required!' },
				pattern: {
					value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
					message: 'Wrong data format!',
				},
			}}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<AuthField
					label="Email"
					icon="MdEmail"
					onChange={onChange}
					error={error}
					value={value}
					placeholder="Your email"
				/>
			)}
		/>
	)
}

export default EmailField
