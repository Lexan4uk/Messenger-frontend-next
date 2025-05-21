import { IProfileChats } from './chats.types'
import { IBase } from './root.types'

export interface IAuthForm {
	login: string
	password: string
}
export interface IUser extends IBase {
	login: string
	name?: string
	imgUrl?: string
	chats: IProfileChats[]
}
export interface IAuthResponse {
	accessToken: string
	user: IUser
}
export interface IAuthErrorResponse {
	error: string
	message: string[]
	statusCode: number
}
export interface IUserUpdate {
	name?: string
	login?: string
	imgUrl?: string
	password?: string
}
