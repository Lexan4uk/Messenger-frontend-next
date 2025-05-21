'use client'

import { Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/AuthField'

import { IAuthForm } from '@/types/auth.types'

import { useAuth } from '@/hooks/useAuth'

export function Auth() {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const [isLoginForm, setIsLoginForm] = useState(false)
	const [isMutationError, setIsMutationError] = useState(false)
	const { mutateAuth } = useAuth({ isLoginForm, reset, setIsMutationError })

	useEffect(() => {
		if (isMutationError) {
			const timeout = setTimeout(() => {
				setIsMutationError(false)
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [isMutationError])

	const onSubmit: SubmitHandler<IAuthForm> = (data: IAuthForm) => {
		mutateAuth(data)
	}
	const onError: SubmitErrorHandler<IAuthForm> = errors => {
		toast('Authorization error')
	}
	return (
		<div className='flex min-h-screen'>
			<form
				className='w-content m-auto flex items-center justify-center rounded-2xl bg-background-secondary p-5 flex-col'
				onSubmit={handleSubmit(onSubmit, onError)}
			>
				<div className='flex mb-3 border-b border-border w-full text-center pb-2 justify-center items-center'>
					<h1 className='text-xl font-medium mr-2'>Tegram</h1>
					<Send className='' />
				</div>

				<Field
					id='login'
					label='Login'
					placeholder='Enter login:'
					extra='mb-4 w-full'
					state={isMutationError ? 'error' : ''}
					{...register('login', { required: 'Login is required' })}
				/>
				<Field
					id='password'
					label='Password'
					placeholder='Enter password:'
					type='password'
					extra='mb-4 w-full'
					state={isMutationError ? 'error' : ''}
					{...register('password', { required: 'Password is required' })}
				/>
				<div className='flex items-center gap-5 justify-center'>
					<Button onClick={() => setIsLoginForm(true)}>Login</Button>
					<Button onClick={() => setIsLoginForm(false)}>Register</Button>
				</div>
			</form>
		</div>
	)
}
