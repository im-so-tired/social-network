import cn from 'classnames'
import { Montserrat } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import './globals.scss'
import ReduxProvider from '@/app/reduxProvider'
import AuthProvider from '@/providers/auth/AuthProvider'

const montserrat = Montserrat({ subsets: ['latin'] })
export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={cn(montserrat.className)}>
				<ReduxProvider>
					<Toaster position="top-right" reverseOrder={false} />
					<AuthProvider>{children}</AuthProvider>
				</ReduxProvider>
			</body>
		</html>
	)
}
