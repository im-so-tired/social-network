'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { logout, checkAuth } = useActions()
	const pathname = usePathname()
	const user = useAuth()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) checkAuth()
	}, [checkAuth])

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken || !user) logout()
	}, [logout, pathname, user])
	return <>{children}</>
}

export default AuthProvider
