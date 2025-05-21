import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import cn from 'clsx'
import { Pencil, User, Users, X } from 'lucide-react'
import { useState } from 'react'

import TransitionPopover from '@/components/ui/TransitionPopover'

import NewMessageDialog from './new-message/NewMessageDialog'

interface ISideMenuActionsButton {
	classNameBlock?: string
}

export default function SideMenuActionsButton({
	classNameBlock
}: ISideMenuActionsButton) {
	const [isNewMessageDialog, setIsNewMessageDialog] = useState(false)

	return (
		<>
			<Popover>
				{({ open }) => (
					<>
						<PopoverButton
							className={cn(
								'p-4 rounded-full block bg-purple-button-active hover:bg-active!',
								'transition-all duration-200',
								'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0',
								'focus:outline-none',
								open && 'opacity-100! translate-y-0!',
								classNameBlock
							)}
						>
							{open ? <X /> : <Pencil />}
						</PopoverButton>
						<TransitionPopover open={open}>
							<PopoverPanel anchor='top end'>
								<div className='popover_base mb-2'>
									<button
										onClick={() => setIsNewMessageDialog(true)}
										className='popover_item'
									>
										<User
											size={20}
											className='popover_icon'
										/>
										<span className='popover_text'>New Message</span>
									</button>
									<button className='popover_item'>
										<Users
											size={20}
											className='popover_icon'
										/>
										<span className='popover_text'>New Group</span>
									</button>
								</div>
							</PopoverPanel>
						</TransitionPopover>
					</>
				)}
			</Popover>
			<NewMessageDialog
				isOpen={isNewMessageDialog}
				onClose={setIsNewMessageDialog}
			/>
		</>
	)
}
