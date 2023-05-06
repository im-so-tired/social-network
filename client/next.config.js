/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	env: {
		APP_URL: process.env.REACT_APP_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:9000/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:9000/uploads/:path*',
			},
		]
	},
}

module.exports = nextConfig
