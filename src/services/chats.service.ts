import {
	IChat,
	IChatUser,
	IChatUsers,
	IKickUserFromChat,
	ILeaveChat
} from '@/types/chats.types'

import { axiosWithAuth } from '@/api/interceptors'

class ChatsService {
	private BASE_URL = '/chat'
	async getChatsMiniaturesByIds(ids: string[]) {
		const response = await axiosWithAuth.post<IChat[]>(
			`${this.BASE_URL}/miniatures`,
			{ ids }
		)
		return response
	}
	async leaveChat(data: ILeaveChat) {
		const response = await axiosWithAuth.post<ILeaveChat>(
			`${this.BASE_URL}/leave`,
			data
		)
		return response
	}
	async getChatUsers({ chatId }: IChatUsers) {
		const response = await axiosWithAuth.get<IChatUser[]>(
			`${this.BASE_URL}/users/${chatId}`
		)
		return response
	}
	async kickUserFromChat(data: IKickUserFromChat) {
		const response = await axiosWithAuth.post<{ message: string }>(
			`${this.BASE_URL}/kick`,
			data
		)
		return response
	}
}
export const chatsService = new ChatsService()
