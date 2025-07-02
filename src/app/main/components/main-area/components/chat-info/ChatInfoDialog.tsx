import cn from 'clsx'
import dayjs from 'dayjs'
import { ArrowLeft, Clock, Info } from 'lucide-react'
import { useState } from 'react'

import LeftPanelDialog from '@/components/ui/LeftPanelDialog'
import LetterPicture from '@/components/ui/LetterPicture'
import { ButtonIcon } from '@/components/ui/buttons/ButtonIcon'

import { IDialogBase } from '@/types/base.types'
import { IChat } from '@/types/chats.types'

import ChatInfoPlaceholder from './chat-info-modules/ChatInfoPlaceholder'
import ChatInfoUsers from './chat-info-modules/chat-info-users/ChatInfoUsers'

interface IChatInfoDialog extends IDialogBase {
	chat: IChat
}

export default function ChatInfoDialog({
	isOpen,
	onClose,
	chat
}: IChatInfoDialog) {
	const [activeBlock, setActiveBlock] = useState<'users' | 'placeholder'>(
		'users'
	)
	return (
		<LeftPanelDialog
			isOpen={isOpen}
			onClose={() => onClose(false)}
		>
			<header className='py-1.5 px-3 flex border-b border-border'>
				<ButtonIcon onClick={() => onClose(prev => !prev)}>
					<ArrowLeft
						size={24}
						className='text-text-secondary'
					/>
				</ButtonIcon>
				<div className='flex flex-1 justify-between items-center'>
					<p className='ml-5.5 text-xl font-medium'>Chat details</p>
				</div>
			</header>

			<div className='flex flex-col h-full'>
				<div className='relative w-full h-30/100 border-b border-border flex items-center justify-center overflow-hidden'>
					<div className='absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none' />
					<div className='absolute bottom-2 left-6 text-xl font-medium z-20 text-white'>
						<span className='px-2 py-0.5'>{chat.title}</span>
					</div>
					<LetterPicture
						url={chat.imgUrl}
						letter={chat.title.charAt(0)}
						addStyle='w-full h-full rounded-none text-[160px]'
					/>
				</div>
				<div className='flex flex-col p-3'>
					<div className='flex items-center py-2.5 px-4'>
						<div className='mr-7'>
							<Info
								className='text-text-secondary'
								size={24}
							/>
						</div>

						<div className='flex flex-col text-start overflow-hidden'>
							{chat.description ? (
								<p className='text-lg break-words'>{chat.description}</p>
							) : (
								<p className='text-lg break-words text-text-secondary italic'>
									No description
								</p>
							)}
						</div>
					</div>
					<div className='flex items-center py-2.5 px-4'>
						<div className='mr-7'>
							<Clock
								className='text-text-secondary'
								size={24}
							/>
						</div>

						<div className='flex flex-col text-start overflow-hidden'>
							<p className='text-lg break-words'>Created at:</p>
							<p className='text-text-secondary text-sm break-words'>
								{dayjs(chat.createdAt).calendar(null, {
									sameDay: 'D MMMM YYYY',
									lastDay: 'D MMMM YYYY',
									lastWeek: 'D MMMM YYYY',
									sameElse: 'D MMMM YYYY'
								})}
							</p>
						</div>
					</div>
					<nav className='flex'>
						<button
							data-active={activeBlock === 'users'}
							className={cn(
								'flex px-2 py-2.5 flex-1 items-center justify-center hover:bg-fields rounded-t-md text-text-secondary relative',
								activeBlock === 'users' && 'text-active! cursor-default!'
							)}
							onClick={() => setActiveBlock('users')}
						>
							<span>Users</span>
							<i
								className={cn(
									'absolute -bottom-0.75 -left-0.5 -right-0.5 mx-5',
									'opacity-0 h-0.75 rounded-t-md pointer-events-none',
									'bg-active transform origin-left transition-all duration-300',
									activeBlock === 'users' && 'opacity-100'
								)}
							/>
						</button>

						<button
							data-active={activeBlock === 'placeholder'}
							className={cn(
								'flex px-2 py-2.5 flex-1 items-center justify-center hover:bg-fields rounded-t-md text-text-secondary relative',
								activeBlock === 'placeholder' && 'text-active! cursor-default!'
							)}
							onClick={() => setActiveBlock('placeholder')}
						>
							<span>Placeholder</span>
							<i
								className={cn(
									'absolute -bottom-0.75 -left-0.5 -right-0.5 mx-5',
									'opacity-0 h-0.75 rounded-t-md pointer-events-none',
									'bg-active transform origin-left transition-all duration-300',
									activeBlock === 'placeholder' && 'opacity-100'
								)}
							/>
						</button>
					</nav>
					<div className='flex-1 flex'>
						{activeBlock === 'users' && (
							<ChatInfoUsers
								chatId={chat.id}
								clientRole={chat.role}
							/>
						)}
						{activeBlock === 'placeholder' && <ChatInfoPlaceholder />}
					</div>
				</div>
			</div>
		</LeftPanelDialog>
	)
}
