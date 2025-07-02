import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle
} from '@headlessui/react'
import cn from 'clsx'
import { X } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { TransparentField } from '@/components/ui/fields/TransparentField'

import { IInviteForm } from '@/types/invite.types'

import { useNewDMInvite } from '../../../hooks/useNewDMInvite'

interface INewMessageDialog {
	isOpen: boolean
	onClose: Dispatch<SetStateAction<boolean>>
}

export default function NewMessageDialog({
	isOpen,
	onClose
}: INewMessageDialog) {
	const { register, handleSubmit, watch } = useForm<IInviteForm>({
		mode: 'onChange'
	})
	const [searchFocus, setSearchFocus] = useState(false)
	const { newDMInvite, inviteDMData, inviteDMError } = useNewDMInvite()

	const onSubmit: SubmitHandler<IInviteForm> = (data: IInviteForm) => {
		newDMInvite(data)
	}

	return (
		<Dialog
			open={isOpen}
			onClose={() => onClose(false)}
			className='dialog_base'
		>
			<DialogPanel className='dialog_panel'>
				<button
					onClick={() => onClose(false)}
					className='dialog_close-icon'
				>
					<X />
				</button>
				<DialogTitle className='text-lg'>Start a private chat</DialogTitle>
				<Description className='text-sm text-text-secondary'>
					Enter the user's login to start a direct conversation{' '}
				</Description>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-2'
				>
					<div
						className={cn(
							'bg-fields flex rounded-full items-center',
							searchFocus && 'ring-2 ring-active'
						)}
					>
						<TransparentField
							placeholder='Login'
							id='login'
							extra='py-2 px-4 w-full'
							onFocus={() => setSearchFocus(true)}
							{...register('targetLogin', {
								onBlur: () => setSearchFocus(false)
							})}
						/>
					</div>
					<Button>Start chat</Button>
					{inviteDMError?.response?.data?.message && (
						<p className='text-red-error text-sm'>
							{inviteDMError.response.data.message}
						</p>
					)}
					{inviteDMData && (
						<p className='text-sm text'>{inviteDMData.message}</p>
					)}
				</form>
			</DialogPanel>
		</Dialog>
	)
}
