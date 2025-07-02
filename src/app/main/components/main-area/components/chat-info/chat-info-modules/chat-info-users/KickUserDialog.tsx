import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition
} from '@headlessui/react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/buttons/Button'

import { IDialogBase } from '@/types/base.types'

import { useKickUserFromChat } from '../../../../hooks/useKickUserFromChat'

interface IKickUserDialog extends IDialogBase {
	chatId: string
	userLogin: string
}

export default function KickUserDialog({
	isOpen,
	onClose,
	chatId,
	userLogin
}: IKickUserDialog) {
	const { kickUser } = useKickUserFromChat()
	const handleKickClick = () => {
		kickUser({ chatId, userLogin })
		onClose(false)
	}
	return (
		<Transition show={isOpen}>
			<Dialog
				open={isOpen}
				onClose={() => onClose(false)}
				className='dialog_base dialog-appearance-animation'
			>
				<DialogPanel className='dialog_panel text-center'>
					<button
						onClick={() => onClose(false)}
						className='dialog_close-icon'
					>
						<X />
					</button>
					<DialogTitle className='text-lg'>Kick user</DialogTitle>
					<Description className='text-sm text-text-secondary mb-2'>
						Are you sure you want to kick this user from chat?
					</Description>
					<Button
						className='text-red-error'
						onClick={handleKickClick}
					>
						Yes
					</Button>
				</DialogPanel>
			</Dialog>
		</Transition>
	)
}
