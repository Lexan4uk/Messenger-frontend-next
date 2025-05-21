'use client'

import { useMutation } from '@tanstack/react-query'

import { IMessage, IMessageSend } from '@/types/message.types'

import { useLoadLastMessage } from './loadLastMessage/useLoadLastMessage'
import { messageService } from '@/services/message.service'

export function useSendMessage() {
	const { setLastMessage } = useLoadLastMessage()

	const {
		mutate: sendMessage,
		isPending,
		isSuccess,
		data
	} = useMutation({
		mutationKey: ['sendMessage'],
		mutationFn: (data: IMessageSend) => messageService.sendMessage(data),
		onSuccess(response) {
			const message: IMessage = response.data
			setLastMessage(message)
		}
	})

	return { sendMessage, isPending, isSuccess, data }
}
