import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition
} from '@headlessui/react'
import { X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/ui/buttons/Button'

import { useLogout } from '@/hooks/useLogout'

interface IExitDialog {
	isOpen: boolean
	onClose: Dispatch<SetStateAction<boolean>>
}

export default function ExitDialog({ isOpen, onClose }: IExitDialog) {
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
