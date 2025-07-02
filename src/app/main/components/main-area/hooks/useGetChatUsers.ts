import { useQuery } from '@tanstack/react-query'

import { chatsService } from '@/services/chats.service'

export function useGetChatUsers(chatId: string) {
	const { data: getChatUsers, isPending: isGetChatUsersPending } = useQuery({
		queryKey: ['chatUsers'],
		queryFn: () => chatsService.getChatUsers({ chatId: chatId })
	})
	return { getChatUsers, isGetChatUsersPending }
}
