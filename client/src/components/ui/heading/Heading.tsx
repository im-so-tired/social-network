import React, { FC, PropsWithChildren } from 'react'
import cn from 'classnames'

const Heading: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className,
}) => {
	return (
		<h2 className={cn('text-3xl font-bold text-black', className)}>
			{children}
		</h2>
	)
}

export default Heading
