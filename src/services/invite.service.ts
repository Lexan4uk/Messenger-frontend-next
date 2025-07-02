import {
	IInvite,
	IInviteCreate,
	IInviteCreateDM,
	IInviteError,
	IInviteListItem,
	IInviteSuccess,
	IInviteUpdateQuery
} from '@/types/invite.types'

import { axiosWithAuth } from '@/api/interceptors'

class InviteService {
	private BASE_URL = '/invite'
	async newInvite(data: IInviteCreate) {
		const response = await axiosWithAuth.post<IInviteSuccess | IInviteError>(
			`${this.BASE_URL}`,
			data
		)
		return response
	}
	async updateInviteStatus({ status, id }: IInviteUpdateQuery) {
		const response = await axiosWithAuth.patch<IInvite>(
			`${this.BASE_URL}/${id}`,
			{
				status
			}
		)
		return response
	}
	async getUserInvites() {
		const response = await axiosWithAuth.get<{ invites: IInviteListItem[] }>(
			`${this.BASE_URL}`
		)
		return response.data.invites
	}
	async newDMInvite(data: IInviteCreateDM) {
		const response = await axiosWithAuth.post<IInviteSuccess | IInviteError>(
			`${this.BASE_URL}/dm`,
			data
		)
		return response
	}
}
export const inviteService = new InviteService()
