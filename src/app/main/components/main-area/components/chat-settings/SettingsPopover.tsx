import { Pen, Trash2, UserPlus } from 'lucide-react'
import { useState } from 'react'

import { EnumRole } from '@/types/chats.types'

import InviteUserDialog from './invite-user/InviteUserDialog'
import LeaveChatDialog from './leave-chat/LeaveChatDialog'

interface ISettingsPopover {
	chatId: string
	userRole: EnumRole
}

export default function SettingsPopover({
	chatId,
	userRole
}: ISettingsPopover) {
	const [isInviteUserDialogOpen, setIsInviteUserDialogOpen] = useState(false)
	const [isLeaveChatDialogOpen, setIsLeaveChatDialogOpen] = useState(false)
	const [isEditChatDialogOpen, setIsEditChatDialogOpen] = useState(false)

	return (
		<>
			<div className='popover_base mt-3'>
				{userRole === EnumRole.admin && (
					<div className='popover_bottom-border flex flex-col'>
						<button
							onClick={() => setIsEditChatDialogOpen(true)}
							className='popover_item popover_item-bottom-border'
						>
							<Pen
								size={20}
								className='popover_icon'
							/>
							<span className='popover_text'>Edit</span>
						</button>
						<button
							onClick={() => setIsInviteUserDialogOpen(true)}
							className='popover_item popover_item-bottom-border'
						>
							<UserPlus
								size={20}
								className='popover_icon'
							/>
							<span className='popover_text'>Invite</span>
						</button>
					</div>
				)}

				<button
					className='popover_item popover_item-bottom-border'
					onClick={() => setIsLeaveChatDialogOpen(true)}
				>
					<Trash2 className='text-red-error' />

					<span className='popover_text text-red-error'>Leave chat</span>
				</button>
			</div>
			<InviteUserDialog
				chatId={chatId}
				isOpen={isInviteUserDialogOpen}
				onClose={setIsInviteUserDialogOpen}
			/>
			<LeaveChatDialog
				chatId={chatId}
				isOpen={isLeaveChatDialogOpen}
				onClose={setIsLeaveChatDialogOpen}
			/>
		</>
	)
}
