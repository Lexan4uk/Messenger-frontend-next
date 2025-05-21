import { IChatMessagesGet, IMessage, IMessageSend } from '@/types/message.types'

import { axiosWithAuth } from '@/api/interceptors'

class MessageService {
	private BASE_URL = '/message'

	async getChatMessages({ chatId, lastMessage, take }: IChatMessagesGet) {
		const response = await axiosWithAuth.get<IMessage[]>(
			`${this.BASE_URL}/chat`,
			{
				params: {
					chatId,
					lastMessage,
					take
				}
			}
		)
		return response
	}

	async sendMessage(data: IMessageSend) {
		const response = await axiosWithAuth.post<IMessage>(
			`${this.BASE_URL}/`,
			data
		)
		return response
	}
}
export const messageService = new MessageService()
