import { NextRequest, NextResponse } from 'next/server'

import { USER_PAGES } from '@/config/page-url.config'

import { EnumTokens } from '@/services/auth-token.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = url.includes('/auth')

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(USER_PAGES.MAIN, url))
	}
	if (isAuthPage) {
		return NextResponse.next()
	}
	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth', url))
	}
	return
}
export const config = {
	matcher: ['/main:path*', '/auth']
}
