import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'
import { IconTypes } from '@/types/icons.type'

interface IMaterialIconProps {
	name: IconTypes
	color?: string
	size?: number
}

const MaterialIcon: FC<IMaterialIconProps> = ({
	name,
	color = '#5f6368',
	size = 22,
}) => {
	const IconComponent = MaterialIcons[name]
	return (
		<IconComponent color={color} size={size} /> || (
			<MaterialIcons.MdDragIndicator color={color} size={size} />
		)
	)
}

export default MaterialIcon
