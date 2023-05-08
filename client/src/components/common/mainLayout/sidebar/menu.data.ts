import { IconTypes } from '@/types/icons.type'

export interface IMenuData {
	title: string
	icon: IconTypes
	link: string
}

export const menuData: IMenuData[] = [
	{
		title: 'Post feed',
		link: '/feed',
		icon: 'MdNewspaper',
	},
	{
		title: 'Messenger',
		link: '/messenger',
		icon: 'MdMessage',
	},
	{
		title: 'Friends',
		link: '/friends',
		icon: 'MdPeople',
	},
	{
		title: 'All users',
		link: '/allUsers',
		icon: 'MdPersonAdd',
	},
]
