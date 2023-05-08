import { Inter, Montserrat } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import './globals.css'
import ReduxProvider from '@/app/reduxProvider'
import AuthProvider from '@/providers/auth/AuthProvider'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })
export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<ReduxProvider>
					<Toaster position="top-right" reverseOrder={false} />
					<AuthProvider>{children}</AuthProvider>
				</ReduxProvider>
			</body>
		</html>
	)
}
