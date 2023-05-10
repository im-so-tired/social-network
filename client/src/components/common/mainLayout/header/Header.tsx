import Image from 'next/image'
import React, { FC } from 'react'

import Profile from '@/components/common/mainLayout/header/Profile'

const Header: FC = () => {
	return (
		<header className="h-[75px] fixed top-0 left-0 w-full bg-white py-4 mb-4 z-50">
			<div className="container flex justify-between">
				<div className="flex items-center">
					<Image alt="logo" src="/logo.png" height={34} width={34} />
					<h1 className="ml-1.5 font-medium text-lg">React Community</h1>
				</div>
				<Profile />
			</div>
		</header>
	)
}

export default Header
