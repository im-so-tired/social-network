import cn from 'classnames'
import React, { FC, InputHTMLAttributes } from 'react'

import MaterialIcon from '@/components/ui/Icon'

interface ISearchField extends InputHTMLAttributes<HTMLInputElement> {}

const SearchField: FC<ISearchField> = ({ className, ...rest }) => {
	return (
		<div className="relative">
			<MaterialIcon name="MdSearch" />
			<input
				className={cn('bg-gray-400 rounded-common p-2 pl-8', className)}
				placeholder="Search"
				{...rest}
			/>
		</div>
	)
}

export default SearchField
