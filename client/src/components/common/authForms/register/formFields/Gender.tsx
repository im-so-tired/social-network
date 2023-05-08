import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material'
import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

import { IRegisterForm } from '@/components/common/authForms/register/register.interface'

const GenderChoice: FC<{ control: Control<IRegisterForm, any> }> = ({
	control,
}) => {
	return (
		<FormControl>
			<FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
			<Controller
				control={control}
				name="gender"
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<RadioGroup value={value} onChange={onChange}>
						<FormControlLabel
							value="female"
							control={<Radio />}
							label="Female"
						/>
						<FormControlLabel value="male" control={<Radio />} label="Male" />
					</RadioGroup>
				)}
			/>
		</FormControl>
	)
}

export default GenderChoice
