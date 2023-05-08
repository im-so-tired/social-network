import React, { FC } from 'react'

import AvatarUpload from '@/components/ui/fields/avatarUpload/AvatarUpload'

interface IAvatarProps {
	selectedFile: File | null
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AvatarField: FC<IAvatarProps> = ({ selectedFile, onChange }) => {
	return (
		<AvatarUpload
			label="AvatarField"
			onChange={onChange}
			alt={'avatar'}
			src={
				selectedFile ? URL.createObjectURL(selectedFile) : '/default-avatar.png'
			}
		/>
	)
}

export default AvatarField
