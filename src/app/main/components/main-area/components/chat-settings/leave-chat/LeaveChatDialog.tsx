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

import { useSelectedChat } from '@/hooks/useSelectedChat'

import { useLeaveChat } from '../../../hooks/useLeaveChat'

interface ILeaveChatDialog extends IDialogBase {
	chatId: string
}

export default function LeaveChatDialog({
	isOpen,
	onClose,
	chatId
}: ILeaveChatDialog) {
	const { leaveChat } = useLeaveChat()
	const { setSelectedChat } = useSelectedChat()
	const handleExitClick = () => {
		leaveChat({ chatId })
		setSelectedChat(null)
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
					<DialogTitle className='text-lg'>Leave chat</DialogTitle>
					<Description className='text-sm text-text-secondary mb-2'>
						Are you sure you want to leave?
					</Description>
					<Button
						className='text-red-error'
						onClick={handleExitClick}
					>
						Yes
					</Button>
				</DialogPanel>
			</Dialog>
		</Transition>
	)
}
