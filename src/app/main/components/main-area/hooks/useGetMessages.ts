import { useQuery } from '@tanstack/react-query'

import { IChatMessagesGet } from '@/types/message.types'

import { messageService } from '@/services/message.service'

export function useGetMessages(params: IChatMessagesGet) {
	const {
		data: messagesData,
		isLoading: isPending,
		isSuccess
	} = useQuery({
		queryKey: ['messages', params.chatId],
		queryFn: () => messageService.getChatMessages(params),
		enabled: !!params.chatId
	})

	const fetchMore = async (lastMessageId: string) => {
		const moreMessages = await messageService.getChatMessages({
			...params,
			lastMessage: lastMessageId
		})
		return moreMessages.data
	}

	return { messagesData, isPending, isSuccess, fetchMore }
}
