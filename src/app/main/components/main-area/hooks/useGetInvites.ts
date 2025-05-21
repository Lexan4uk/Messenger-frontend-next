import { useQuery } from '@tanstack/react-query'

import { inviteService } from '@/services/invite.service'

export function useGetInvites() {
	const { data: invitesData, isLoading: isInvitesDataLoading } = useQuery({
		queryKey: ['getInvites'],
		queryFn: () => inviteService.getUserInvites()
	})

	return { invitesData, isInvitesDataLoading }
}
