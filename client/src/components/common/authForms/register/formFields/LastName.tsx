import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

import AuthField from '@/components/common/authForms/AuthField'
import { IRegisterForm } from '@/components/common/authForms/register/register.interface'

const LastName: FC<{ control: Control<IRegisterForm, any> }> = ({
	control,
}) => {
	return (
		<Controller
			control={control}
			name="lastName"
			rules={{
				required: { value: true, message: 'Field is required!' },
				pattern: { value: /^[\p{L} -]+$/u, message: 'Wrong data format!' },
			}}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<AuthField
					label="Last Name"
					icon="MdPerson"
					onChange={onChange}
					error={error}
					value={value}
					placeholder="Your last name"
				/>
			)}
		/>
	)
}

export default LastName
