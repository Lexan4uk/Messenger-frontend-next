export enum EnumInviteStatus {
	pending = 'pending',
	accepted = 'accepted',
	declined = 'declined'
}
export interface IInvite {
	chatId: string
	senderLogin: string
	targetLogin: string
	status: EnumInviteStatus
}

export interface IInviteCreate {
	chatId: string
	targetLogin: string
}
export interface IInviteCreateDM {
	targetLogin: string
}
export interface IInviteSuccess {
	message: string
	invite?: IInvite
}
export interface IInviteError {
	error: string
	message: string
	statusCode: number
}
export interface IInviteListItem {
	id: string
	chatName: string
	senderName: string
}
export interface IInviteForm {
	targetLogin: string
}

export interface IInviteUpdateQuery {
	id: string
	status: EnumInviteStatus
}
