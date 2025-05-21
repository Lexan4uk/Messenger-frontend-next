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

import { IInviteCreate, IInviteForm } from '@/types/invite.types'

import { useNewInvite } from '../../hooks/useNewInvite'

interface IInviteUserDialog {
	chatId: string
	isOpen: boolean
	onClose: Dispatch<SetStateAction<boolean>>
}

export default function InviteUserDialog({
	chatId,
	isOpen,
	onClose
}: IInviteUserDialog) {
	const { register, handleSubmit, reset } = useForm<IInviteForm>({
		mode: 'onChange'
	})
	const [searchFocus, setSearchFocus] = useState(false)
	const { newInvite, inviteError, isInviteError, isInviteSuccess } =
		useNewInvite()

	const onSubmit: SubmitHandler<IInviteForm> = (data: IInviteForm) => {
		const queryData: IInviteCreate = {
			chatId: chatId,
			targetLogin: data.targetLogin
		}
		newInvite(queryData)
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
				<DialogTitle className='text-lg'>Invite user</DialogTitle>
				<Description className='text-sm text-text-secondary'>
					Enter the user's login to send an invite
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
					<Button>Send invite</Button>
					{isInviteError && inviteError?.response?.data?.message && (
						<p className='text-red-error text-sm'>
							{inviteError.response.data.message}
						</p>
					)}
					{isInviteSuccess && <p className='text-sm'>Invite sent</p>}
				</form>
			</DialogPanel>
		</Dialog>
	)
}
