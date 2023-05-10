import cn from 'classnames'
import React, { FC } from 'react'

import PrimaryField, {
	IPrimaryField,
} from '@/components/ui/fields/primaryField/PrimaryField'

const AuthField: FC<IPrimaryField> = ({ className, ...rest }) => {
	return (
		<PrimaryField {...rest} className={cn('mt-6 rounded-3xl', className)} />
	)
}

export default AuthField
