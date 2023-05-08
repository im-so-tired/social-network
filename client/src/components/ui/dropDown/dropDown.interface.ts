interface IOption {
	label: string
	onClick: () => void
}

export interface IDropDownProps {
	options: IOption[]
	className?: string
}
