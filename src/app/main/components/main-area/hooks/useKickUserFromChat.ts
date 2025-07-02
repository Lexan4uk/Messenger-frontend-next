import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { IKickUserFromChat } from '@/types/chats.types'

import { chatsService } from '@/services/chats.service'

export function useKickUserFromChat() {
	const queryClient = useQueryClient()
	const { mutate: kickUser } = useMutation({
		mutationKey: ['kick'],
		mutationFn: (data: IKickUserFromChat) =>
			chatsService.kickUserFromChat(data),
		onSuccess: data => {
			toast(data.data.message)
			queryClient.invalidateQueries({ queryKey: ['chatUsers'] })
		},
		onError: data => {
			toast(data.message)
		}
	})

	return { kickUser }
}
