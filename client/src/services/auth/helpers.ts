import Cookies from 'js-cookie'
import { IAuthResponse } from '@/types/auth.interface'

export const saveTokens = (data: IAuthResponse) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const removeTokens = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokens(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
