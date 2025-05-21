import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { IInviteCreateDM, IInviteError } from '@/types/invite.types'

import { inviteService } from '@/services/invite.service'

export function useNewDMInvite() {
	const {
		mutate: newDMInvite,
		data: inviteDMData,
		isError: isInviteDMError,
		isSuccess: isInviteDMSuccess,
		error: inviteDMError
	} = useMutation<any, AxiosError<IInviteError>, IInviteCreateDM>({
		mutationKey: ['newInvite'],
		mutationFn: (data: IInviteCreateDM) => inviteService.newDMInvite(data)
	})

	return {
		newDMInvite,
		inviteDMData,
		isInviteDMError,
		isInviteDMSuccess,
		inviteDMError
	}
}
