import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

export const useAuthRedirect = () => {
	const user = useAuth()
	const { replace } = useRouter()
	useEffect(() => {
		if (user) replace(`/profile/${user.id}`)
	}, [replace, user])
}
