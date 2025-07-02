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
	imgUrl?: string
	role: EnumRole
	usersCount?: number
	createdAt: string
}
export interface IChatMiniatures {
	ids: string[]
}
export interface ILeaveChat {
	chatId: string
}
export interface IChatUsers {
	chatId: string
}
export interface IChatUser {
	name: string
	login: string
	imgUrl?: string
	role: EnumRole
}
export interface IKickUserFromChat {
	chatId: string
	userLogin: string
}
