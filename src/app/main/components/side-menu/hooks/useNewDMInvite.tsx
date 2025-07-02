import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import {
	IInviteCreateDM,
	IInviteError,
	IInviteSuccess
} from '@/types/invite.types'

import { inviteService } from '@/services/invite.service'

export function useNewDMInvite() {
	const queryClient = useQueryClient()

	const {
		mutate: newDMInvite,
		data: inviteDMData,
		error: inviteDMError
	} = useMutation<IInviteSuccess, AxiosError<IInviteError>, IInviteCreateDM>({
		mutationKey: ['newDMInvite'],
		mutationFn: (data: IInviteCreateDM) =>
			inviteService.newDMInvite(data).then(response => response.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	return {
		newDMInvite,
		inviteDMData,
		inviteDMError
	}
}
