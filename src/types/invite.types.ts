import { IBase } from './root.types'

export enum EnumInviteStatus {
	pending = 'pending',
	accepted = 'accepted',
	declined = 'declined'
}
export interface IInvite extends IBase {
	chaiId: string
	senderId: string
	targetId: string
}
export interface IInviteCreate {
	chatId: string
	targetLogin: string
}
export interface IInviteCreateDM {
	targetLogin: string
}
export interface IInviteForm {
	targetLogin: string
}
export interface IInviteError {
	error: string
	message: string
	statusCode: number
}
export interface IInvitesGet {
	id: string
	chat: {
		title: string
	}
	sender: {
		name?: string
		login: string
	}
}

export interface IInviteUpdateQuery {
	id: string
	status: EnumInviteStatus
}
