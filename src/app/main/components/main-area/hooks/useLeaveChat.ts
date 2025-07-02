import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ILeaveChat } from '@/types/chats.types'

import { chatsService } from '@/services/chats.service'

export function useLeaveChat() {
	const queryClient = useQueryClient()

	const {
		mutate: leaveChat,
		isError: isLeaveError,
		isSuccess: isLeaveSuccess
	} = useMutation({
		mutationKey: ['leaveChat'],
		mutationFn: (data: ILeaveChat) => chatsService.leaveChat(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	return { leaveChat, isLeaveError, isLeaveSuccess }
}
