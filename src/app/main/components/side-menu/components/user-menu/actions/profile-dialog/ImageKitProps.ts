'use server'

import { getUploadAuthParams } from '@imagekit/next/server'

export default async function ImageKitProps() {
	const { token, expire, signature } = getUploadAuthParams({
		privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
		publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string
	})

	return {
		token,
		expire,
		signature,
		publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
	}
}
