import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { authService } from '@/services/auth.service'

export function useLogout() {
	const { mutate: mutateLogout } = useMutation({
		mutationKey: ['auth'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			window.location.href = '/auth'
		},
		onError() {
			toast.error('Logout error')
		}
	})
	return { mutateLogout }
}
