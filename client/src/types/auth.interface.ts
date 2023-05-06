import { IUser } from '@/types/user.interface'

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}

export interface IEmailPassword {
	email: string
	password: string
}
