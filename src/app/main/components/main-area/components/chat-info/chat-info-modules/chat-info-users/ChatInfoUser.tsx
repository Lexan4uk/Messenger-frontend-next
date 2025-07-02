import { Ban } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import LetterPicture from '@/components/ui/LetterPicture'

import { EnumRole, IChatUser } from '@/types/chats.types'

import KickUserDialog from './KickUserDialog'

interface IChatInfoUsers {
	user: IChatUser
	actions: boolean
	chatId: string
}

export default function ChatInfoUser({
	user,
	actions,
	chatId
}: IChatInfoUsers) {
	const [isKickDialogOpen, setIsKickDialogOpen] = useState(false)
	return (
		<div className='group relative hover:bg-fields rounded-xl'>
			<button
				onClick={() => toast('User profile')}
				className='flex h-18 p-2.25 w-full'
			>
				<div className='mr-2'>
					<LetterPicture
						url={user.imgUrl}
						letter={user.name.charAt(0)}
					/>
				</div>
				<div className='flex justify-between flex-1'>
					<div className='min-w-0 flex-1 flex flex-col justify-between text-left'>
						<div className='flex gap-1'>
							<h3 className='text-base font-medium truncate'>{user.name}</h3>
						</div>
						<p className='text-text-secondary text-sm'>
							{user.role === EnumRole.admin ? 'Admin' : 'User'}
						</p>
					</div>
				</div>
			</button>
			{actions && (
				<>
					<button
						onClick={() => {
							setIsKickDialogOpen(true)
						}}
						className='opacity-0 group-hover:opacity-100 z-10 absolute top-1 right-1 p-2'
					>
						<Ban className='text-red-error' />
					</button>
					<KickUserDialog
						isOpen={isKickDialogOpen}
						onClose={setIsKickDialogOpen}
						chatId={chatId}
						userLogin={user.login}
					/>
				</>
			)}
		</div>
	)
}
