export enum EnumRole {
	admin = 'admin',
	user = 'user',
	banned = 'banned'
}
export enum EnumChatType {
	group = 'group',
	private = 'private'
}
export interface IProfileChats {
	chatId: string
	role: EnumRole
}
export interface IChat {
	id: string
	title: string
	type: EnumChatType
	description?: string
}
