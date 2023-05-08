import React, { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'

const RegisterFormHeader: FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
	return (
		<header>
			<Heading className="mb-4">Create new account</Heading>
			<p>
				Already A Member?
				<span className="ml-2 text-primary cursor-pointer" onClick={toggleForm}>
					Log In
				</span>
			</p>
		</header>
	)
}

export default RegisterFormHeader
