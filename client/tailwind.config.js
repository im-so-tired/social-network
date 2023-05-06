/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx,scss}'],
	theme: {
		colors: {
			white: colors.white,
			black: colors.black,
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
		plugin(function ({ addUtilities, addComponents, theme }) {
			addComponents({
				'.btn-primary': {
					backgroundColor: theme('text.primary'),
					borderRadius: theme('borderRadius.common'),
					color: '#FFF',
					textTransform: 'uppercase',
					boxShadow:
						'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;',
					cursor: 'pointer',
					transitionProperty: theme('transitionProperty.shadow'),
					transitionDuration: '200ms',
					'&:hover': {
						boxShadow:
							'rgb(0 0 0 / 20%) 0px 3px 10px -2px, rgb(0 0 0 / 14%) 0px 2px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;',
						transitionProperty: theme('transitionProperty.shadow'),
						transitionDuration: '200ms',
					},
				},
				'.myField': {
					border: `1px solid ${theme('colors.gray[400]')}`,
					borderRadius: theme('borderRadius.common'),
				},
			}),
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
				})
		}),
	],
}
