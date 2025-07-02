import { LogOut } from 'lucide-react'
import { useState } from 'react'

import LetterPicture from '@/components/ui/LetterPicture'

import { IUser } from '@/types/auth.types'

import ExitDialog from './actions/exit-dialog/ExitDialog'
import ProfileDialog from './actions/profile-dialog/ProfileDialog'

interface IUserSettingsPopover {
	user: IUser
}

export default function UserSettingsPopover({ user }: IUserSettingsPopover) {
	const [isProfileDialog, setIsProfileDialog] = useState(false)
	const [isExitDialog, setIsExitDialog] = useState(false)

	return (
		<>
			<div className='popover_base mt-4 border'>
				<div className='popover_bottom-border'>
					<button
						className='popover_item '
						onClick={() => setIsProfileDialog(true)}
					>
						<LetterPicture
							addStyle='text-sm! w-6'
							letter={user.name?.charAt(0) || 'P'}
							url={user.imgUrl}
						/>

						<span className='popover_text'>
							{user.name ? user.name : 'Profile'}
						</span>
					</button>
				</div>
				<button
					className='popover_item popover_item-bottom-border'
					onClick={() => setIsExitDialog(true)}
				>
					<LogOut className='text-red-error' />

					<span className='popover_text text-red-error'>Log out</span>
				</button>
			</div>
			<ProfileDialog
				isOpen={isProfileDialog}
				onClose={setIsProfileDialog}
			/>
			<ExitDialog
				isOpen={isExitDialog}
				onClose={setIsExitDialog}
			/>
		</>
	)
}
