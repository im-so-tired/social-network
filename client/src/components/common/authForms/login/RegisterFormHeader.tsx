import React, { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'

const LoginFormHeader: FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
	return (
		<header>
			<Heading className="mb-4">Welcome back!</Heading>
			<p>
				Don`t you have an account?
				<span className="ml-2 text-primary cursor-pointer" onClick={toggleForm}>
					Sign Up
				</span>
			</p>
		</header>
	)
}

export default LoginFormHeader
