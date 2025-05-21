import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'

import { IAuthErrorResponse, IAuthForm } from '@/types/auth.types'

import { USER_PAGES } from '@/config/page-url.config'

import { authService } from '@/services/auth.service'

interface IUseAuth {
	isLoginForm: boolean
	reset: UseFormReset<IAuthForm>
	setIsMutationError: Dispatch<SetStateAction<boolean>>
}

export function useAuth({ isLoginForm, reset, setIsMutationError }: IUseAuth) {
	const { push } = useRouter()

	const { mutate: mutateAuth } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			if (isLoginForm === true) toast.success('Successfully login')
			else toast.success('Successfully registered')
			reset()
			push(USER_PAGES.MAIN)
		},
		onError(error: AxiosError<IAuthErrorResponse>) {
			setIsMutationError(true)
			toast.error(
				`Authorization error: ${error.response?.data.message ?? 'unknown error'}`
			)
		}
	})
	return { mutateAuth }
}
