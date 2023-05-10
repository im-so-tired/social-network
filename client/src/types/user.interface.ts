import { IPost } from '@/types/post.interface'

export interface IUser {
	id: number
	email: string
	firstName: string
	lastName: string
	avatarPath: string
	age: number
	city?: string
	university?: string
	gender: 'male' | 'female'
	friends: number[]
}

export interface IUserWithPosts extends IUser {
	posts: IPost[]
}
