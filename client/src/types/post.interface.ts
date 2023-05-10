interface Author {
	id: number
	firstName: string
	lastName: string
	avatarPath: string
}

export interface IPost {
	id: number
	title: string
	message: string
	lastUpdate: number
	image: string
	likes: number[]
	author: Author
}
