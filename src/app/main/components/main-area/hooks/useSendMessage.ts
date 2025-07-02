'use client'

import { useMutation } from '@tanstack/react-query'

import { IMessageSend } from '@/types/message.types'

import { messageService } from '@/services/message.service'

export function useSendMessage() {
	const {
		mutate: sendMessage,
		isPending,
		isSuccess,
		data
	} = useMutation({
		mutationKey: ['sendMessage'],
		mutationFn: (data: IMessageSend) => messageService.sendMessage(data)
	})

	return { sendMessage, isPending, isSuccess, data }
}
