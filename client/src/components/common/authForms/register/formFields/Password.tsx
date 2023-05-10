import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

import AuthField from '@/components/common/authForms/AuthField'
import { IRegisterForm } from '@/components/common/authForms/register/register.interface'

const Password: FC<{ control: Control<IRegisterForm, any> }> = ({
	control,
}) => {
	return (
		<Controller
			control={control}
			name="password"
			rules={{
				required: { value: true, message: 'Field is required!' },
				minLength: { value: 6, message: 'At least 6 characters!' },
			}}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<AuthField
					type="password"
					label="Password"
					icon="MdPassword"
					onChange={onChange}
					error={error}
					value={value}
					placeholder="At least 6 characters"
				/>
			)}
		/>
	)
}

export default Password
