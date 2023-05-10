'use client'

import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

import { useAppSelector } from '@/hooks/redux'

const Home: FC = () => {
	const router = useRouter()
	const id = useAppSelector((state) => state.user.user?.id)
	router.replace(`/profile/${id}`)
	return null
}

export default Home
