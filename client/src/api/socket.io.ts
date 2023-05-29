import Cookies from 'js-cookie'
import { io } from 'socket.io-client'

const URL = process.env.BACKEND_URL

export const socket = io(`${URL}`, {
	auth: (cb) => {
		cb({ token: Cookies.get('accessToken') })
	},
	autoConnect: false,
	// transports: ['websocket', 'polling'],
})
