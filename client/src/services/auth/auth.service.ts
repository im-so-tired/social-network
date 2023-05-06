import { axiosClassic, axiosFormData } from '@/api/interseptor'
import { removeTokens, saveToStorage } from '@/services/auth/helpers'
import Cookies from 'js-cookie'
import { IAuthResponse, IEmailPassword } from '@/types/auth.interface'
import { AxiosResponse } from 'axios'

export const AuthService = {
	async register(data: FormData): Promise<AxiosResponse<IAuthResponse>> {
		const response = await axiosFormData.post('auth/register', data)
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},

	async login(data: IEmailPassword): Promise<AxiosResponse<IAuthResponse>> {
		const response = await axiosClassic.post('auth/login', data)
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},

	logout() {
		removeTokens()
		localStorage.removeItem('user')
	},

	async getNewTokens(): Promise<AxiosResponse<IAuthResponse>> {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axiosClassic.post('auth/login/access-token', {
			refreshToken,
		})
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},
}
