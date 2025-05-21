import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { Toaster } from 'sonner'

import { SITE_NAME } from '@/constants/seo.constants'

import './globals.scss'
import { Providers } from './providers'
import './tailwind-intellisense.css'

const rubik = Rubik({
	variable: '--font-rubik',
	subsets: ['latin', 'cyrillic']
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Simple messenger Tegram',
	icons: {
		icon: '/darkicon.png'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={rubik.className}
				suppressHydrationWarning
			>
				<Providers>
					{children}
					<Toaster
						theme='dark'
						position='bottom-right'
						duration={1500}
					/>
				</Providers>
			</body>
		</html>
	)
}
