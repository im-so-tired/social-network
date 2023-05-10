import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

import AuthField from '@/components/common/authForms/AuthField'
import { IRegisterForm } from '@/components/common/authForms/register/register.interface'

const University: FC<{ control: Control<IRegisterForm, any> }> = ({
	control,
}) => {
	return (
		<Controller
			control={control}
			name="university"
			rules={{
				pattern: { value: /^[\p{L} -]+$/u, message: 'Wrong data format!' },
			}}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<AuthField
					label="University"
					icon="MdSchool"
					onChange={onChange}
					error={error}
					value={value}
					placeholder="Your university"
				/>
			)}
		/>
	)
}

export default University
