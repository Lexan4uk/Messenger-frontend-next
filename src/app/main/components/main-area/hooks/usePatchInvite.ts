import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IInviteUpdateQuery } from '@/types/invite.types'

import { inviteService } from '@/services/invite.service'

export function usePatchInvite() {
	const queryClient = useQueryClient()
	const {
		mutate: patchInvite,
		isError: isPatchInviteError,
		isSuccess: isPatchInviteSuccess
	} = useMutation({
		mutationKey: ['patchInvite'],
		mutationFn: (data: IInviteUpdateQuery) =>
			inviteService.updateInviteStatus(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getInvites'] })
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	return { patchInvite, isPatchInviteError, isPatchInviteSuccess }
}
