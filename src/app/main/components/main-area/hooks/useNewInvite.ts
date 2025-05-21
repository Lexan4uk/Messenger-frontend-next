import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { IInviteCreate, IInviteError } from '@/types/invite.types'

import { inviteService } from '@/services/invite.service'

export function useNewInvite() {
	const {
		mutate: newInvite,
		data: inviteData,
		isError: isInviteError,
		isSuccess: isInviteSuccess,
		error: inviteError
	} = useMutation<any, AxiosError<IInviteError>, IInviteCreate>({
		mutationKey: ['newInvite'],
		mutationFn: (data: IInviteCreate) => inviteService.newInvite(data)
	})

	return { newInvite, inviteData, isInviteError, isInviteSuccess, inviteError }
}
