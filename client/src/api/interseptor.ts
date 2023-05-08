import axios from 'axios'
import Cookies from 'js-cookie'

export const API_URL = `${process.env.BACKEND_URL}/api`

export const getContentType = (type: string = 'application/json') => {
	return {
		'Content-Type': type,
	}
}

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
})

export const axiosFormData = axios.create({
	baseURL: API_URL,
	headers: getContentType('multipart/form-data'),
})

export const axiosAuth = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
})

axiosAuth.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})
