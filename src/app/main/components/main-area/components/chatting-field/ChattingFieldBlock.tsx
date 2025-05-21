import { useState } from 'react'

import ProfileDialog from '../../../side-menu/components/user-menu/actions/profile-dialog/ProfileDialog'

export default function ChattingFieldBlock() {
	const [isProfileDialog, setIsProfileDialog] = useState(false)
	return (
		<>
			<div className='MessageInputField mb-7 pt-2 flex items-end'>
				<div className='bg-background-secondary flex flex-1 items-center justify-center rounded-2xl h-14'>
					<p>
						To send messages, set the name in the{' '}
						<button
							onClick={() => setIsProfileDialog(true)}
							className='text-active'
						>
							account settings
						</button>
					</p>
				</div>
			</div>
			<ProfileDialog
				isOpen={isProfileDialog}
				onClose={setIsProfileDialog}
			/>
		</>
	)
}
