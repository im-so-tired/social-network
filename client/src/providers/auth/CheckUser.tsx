'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { IUser } from '@/types/user.interface'

const CheckUser: FC<PropsWithChildren> = ({ children }) => {
	const user = useAuth()
	const pathname = usePathname()
	const router = useRouter()
	useEffect(() => {
		if (!user) pathname !== '/auth' && router.replace('/auth')
	}, [user])

	if (user) return <>{children}</>
	else {
		router.replace('/auth')
		return null
	}
}

export default CheckUser
