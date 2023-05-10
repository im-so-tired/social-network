'use client'

import { Skeleton } from '@mui/material'
import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'

import PrimaryField from '@/components/ui/fields/primaryField/PrimaryField'
import Heading from '@/components/ui/heading/Heading'
import User from '@/components/ui/user/User'

import { useAppSelector } from '@/hooks/redux'
import { useActions } from '@/hooks/useActions'
import useDebounce from '@/hooks/useDebounce'

const array = [1, 2, 3, 4, 5]
const AllUsers: NextPage = () => {
	const [firstRender, setFirstRender] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedValue = useDebounce<string>(searchTerm, 500)
	const page = useRef(1)
	const loadMoreRef = useRef(null)
	const { getAllUsers, clearFindUsers } = useActions()
	const { users, totalPages, loading } = useAppSelector(
		(state) => state.getUsers
	)

	useEffect(() => {
		page.current = 1
		clearFindUsers()
	}, [debouncedValue])

	useEffect(() => {
		setFirstRender(false)
		return () => {
			clearFindUsers()
		}
	}, [])

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 0,
		}

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && page.current <= totalPages + 1) {
				getAllUsers({ searchTerm: debouncedValue, page: page.current })
				page.current += 1
			}
		}, options)

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current)
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current)
			}
		}
	}, [debouncedValue, totalPages])
	return (
		<div>
			<div className="island p-8">
				<Heading className="mb-2">All users</Heading>
				<PrimaryField
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search"
					label=""
					icon="MdSearch"
					className="rounded-common"
				/>
				<div className="flex flex-col gap-4 mt-4">
					{loading && firstRender
						? array.map((_, i) => (
								<Skeleton variant="rounded" height={415} key={i} />
						  ))
						: users.map((user) => <User key={user.id} user={user} />)}
				</div>
				<div ref={loadMoreRef} style={{ height: '10px' }} />
			</div>
		</div>
	)
}

export default AllUsers
