/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
	swcMinify: true,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		BACKEND_URL: process.env.BACKEND_URL,
	},
	images: {
		domains: ['social-network-production-60ea.up.railway.app', 'localhost'],
	},
}

module.exports = nextConfig
