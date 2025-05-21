'use client'

import { ImageKitProvider } from '@imagekit/next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider as JotaiProvider } from 'jotai'
import { PropsWithChildren, useState } from 'react'

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			<JotaiProvider>
				<ImageKitProvider
					urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
				>
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
				</ImageKitProvider>
			</JotaiProvider>
		</QueryClientProvider>
	)
}
