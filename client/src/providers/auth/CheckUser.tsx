'use client'

import { useRouter } from 'next/navigation'
import React, { FC, PropsWithChildren, useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

const CheckUser: FC<PropsWithChildren> = ({ children }) => {
	const user = useAuth()
	const router = useRouter()
	useEffect(() => {
		if (!user) router.replace('/auth')
	}, [user])

	if (user) return <>{children}</>
	else {
		router.replace('/auth')
		return null
	}
}

export default CheckUser
