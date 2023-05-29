/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
	swcMinify: true,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		BACKEND_URL: process.env.BACKEND_URL,
	},
	images: {
		domains: [
			'social-network-production-60ea.up.railway.app',
			'localhost',
			'social-network-production-91ee.up.railway.app',
		],
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/auth',
				permanent: true,
			},
		]
	},
	// webpack: (config, option) => {
	// 	config.external.push({
	// 		bufferutil: 'bufferutil',
	// 		'utf-8-validate': 'utf-8-validate',
	// 	})
	// 	return config
	// },
}

module.exports = nextConfig
