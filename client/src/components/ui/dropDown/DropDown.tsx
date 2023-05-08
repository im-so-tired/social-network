import cn from 'classnames'
import { FC, PropsWithChildren, useRef, useState } from 'react'

import { IDropDownProps } from '@/components/ui/dropDown/dropDown.interface'

import { useOutsideClick } from '@/hooks/useOutsideClick'

const DropDown: FC<PropsWithChildren<IDropDownProps>> = ({
	children,
	options,
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)
	const toggleRef = useRef(null)
	useOutsideClick(menuRef, toggleRef, () => setIsOpen(false))

	return (
		<div
			ref={toggleRef}
			onClick={() => setIsOpen((prev) => !prev)}
			className="relative"
		>
			{children}
			{isOpen ? (
				<ul
					ref={menuRef}
					className={cn('bg-white rounded-common absolute', className)}
				>
					{options.map((opt) => (
						<li
							key={opt.label}
							onClick={() => opt.onClick()}
							className="cursor-pointer px-6 py-3"
						>
							{opt.label}
						</li>
					))}
				</ul>
			) : null}
		</div>
	)
}

export default DropDown
