import { IChat } from '@/types/chats.types'

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
}
export const chatsService = new ChatsService()
