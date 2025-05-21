import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { chatsService } from '@/services/chats.service'

export function useMiniChats() {
	const { profileData: userData, isLoading: userDataIsLoading } = useProfile()

	const {
		data: miniatures,
		isPending: isMiniaturePending,
		isSuccess: isMiniaturesSuccess,
		mutate: miniaturesMutate
	} = useMutation({
		mutationKey: ['miniatures'],
		mutationFn: (ids: string[]) => chatsService.getChatsMiniaturesByIds(ids)
	})

	useEffect(() => {
		if (userData?.chats?.length) {
			const chatIds = userData.chats.map(chat => chat.chatId)
			miniaturesMutate(chatIds)
		}
	}, [userData, miniaturesMutate])

	return {
		miniatures: miniatures,
		isMiniaturesLoading: isMiniaturePending || userDataIsLoading,
		isMiniaturesSuccess
	}
}
