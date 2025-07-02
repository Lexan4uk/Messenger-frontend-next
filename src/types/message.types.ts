import { IBase } from './root.types'

export interface IChatMessagesGet {
	chatId: string
	lastMessage?: string
	take?: number
}

export interface IMessage extends IBase {
	chatId: string
	content: string
	sender: ISender
}
interface ISender {
	name: string
	login: string
	imgUrl?: string
}
export interface IMessageSend {
	chatId: string
	content: string
}
export interface IMessageSendResponse {
	message: string
}
