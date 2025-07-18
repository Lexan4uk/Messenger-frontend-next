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

import { useLogout } from '@/hooks/useLogout'

export default function ExitDialog({ isOpen, onClose }: IDialogBase) {
	const { mutateLogout } = useLogout()
	const handleExitClick = () => {
		mutateLogout()
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
					<DialogTitle className='text-lg'>Exit</DialogTitle>
					<Description className='text-sm text-text-secondary mb-2'>
						Are you sure you want to exit?
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
