export interface IRegisterForm {
	firstName: string
	lastName: string
	email: string
	password: string
	age: string
	city: string
	university: string
	gender: 'male' | 'female'
	avatar: File | null
}
