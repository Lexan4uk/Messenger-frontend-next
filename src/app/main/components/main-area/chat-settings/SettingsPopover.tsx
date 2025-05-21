import { UserPlus } from 'lucide-react'
import { useState } from 'react'

import InviteUserDialog from './invite-user/InviteUserDialog'

interface ISettingsPopover {
	chatId: string
}

export default function SettingsPopover({ chatId }: ISettingsPopover) {
	const [isInviteUserDialogOpen, setIsInviteUserDialogOpen] = useState(false)

	return (
		<>
			<div className='popover_base mt-3'>
				<button
					onClick={() => setIsInviteUserDialogOpen(true)}
					className='popover_item'
				>
					<UserPlus
						size={20}
						className='popover_icon'
					/>
					<span className='popover_text'>Invite</span>
				</button>
			</div>
			<InviteUserDialog
				chatId={chatId}
				isOpen={isInviteUserDialogOpen}
				onClose={setIsInviteUserDialogOpen}
			/>
		</>
	)
}
