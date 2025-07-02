import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { IUserUpdate } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export function useProfileUpdate() {
	const queryClient = useQueryClient()
	const {
		mutate: updateProfile,
		isPending: updatePending,
		error: updateError
	} = useMutation({
		mutationKey: ['updateProfile'],
		mutationFn: (data: IUserUpdate) => userService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast('Profile updated!')
		},
		onError: (error: AxiosError<any>) => {
			toast(
				error.response?.data?.message
					? `Update profile error: ${error.response.data.message.join(', ')}`
					: 'Unknown update profile error'
			)
		}
	})

	return { updateProfile, updatePending, updateError }
}
