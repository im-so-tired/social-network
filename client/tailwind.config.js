/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			white: colors.white,
			black: colors.black,
			red: colors.red,
			primary: '#1877F2',
			gray: {
				200: '#F8F9FB',
				300: '#F8FAFB',
				400: '#F6F6F6',
				500: '#B6B6B6',
				800: '#646466',
			},
			blue: {
				200: '#B1BECD',
				400: '#A1AEBE',
				800: '#49607E',
			},
		},
		extend: {
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out',
			},
			transitionDuration: {
				DEFAULT: '200ms',
			},
			zIndex: {
				1: '1',
				2: '2',
				3: '3',
			},
			borderRadius: {
				common: '0.7rem',
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.flex-center': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				},
				'.container': {
					width: '1200px',
					margin: '0 auto',
				},
				'.island': {
					backgroundColor: '#FFF',
					borderRadius: '0.7rem',
				},
			})
		}),
	],
}
