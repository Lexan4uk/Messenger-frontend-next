import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import {
	IInviteCreate,
	IInviteError,
	IInviteSuccess
} from '@/types/invite.types'

import { inviteService } from '@/services/invite.service'

export function useNewInvite() {
	const {
		mutate: newInvite,
		data: inviteData,
		error: inviteError
	} = useMutation<IInviteSuccess, AxiosError<IInviteError>, IInviteCreate>({
		mutationKey: ['newInvite'],
		mutationFn: (data: IInviteCreate) =>
			inviteService.newInvite(data).then(response => response.data)
	})

	return { newInvite, inviteData, inviteError }
}
