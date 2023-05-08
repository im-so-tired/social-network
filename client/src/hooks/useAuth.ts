import { useAppSelector } from '@/hooks/redux'

export const useAuth = () => {
	const { user } = useAppSelector((state) => state.user)
	return user
}
