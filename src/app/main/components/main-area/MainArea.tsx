'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import cn from 'clsx'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'

import LetterPicture from '@/components/ui/LetterPicture'
import TransitionPopover from '@/components/ui/TransitionPopover'
import { ButtonIcon } from '@/components/ui/buttons/ButtonIcon'

import { EnumChatType } from '@/types/chats.types'

import { useSelectedChat } from '@/hooks/useSelectedChat'

import MessagesArea from './components/MessagesArea'
import ChatInfoDialog from './components/chat-info/ChatInfoDialog'
import SettingsPopover from './components/chat-settings/SettingsPopover'

export default function MainArea() {
	const { selectedChat } = useSelectedChat()

	const [isChaiInfoDialog, setIsChatInfoDialog] = useState(false)

	if (!selectedChat) return null

	const isPrivate = selectedChat.type === EnumChatType.private

	return !selectedChat ? (
		''
	) : (
		<main className='MainArea flex flex-col w-full relative'>
			<header className='flex h-13 px-3 py-1.5 items-center content-between bg-background-secondary'>
				<button
					type='button'
					disabled={isPrivate}
					aria-disabled={isPrivate}
					onClick={() => !isPrivate && setIsChatInfoDialog(true)}
					className={cn(
						'flex h-full w-full text-left',
						isPrivate && 'cursor-default!'
					)}
				>
					<div className='mr-2.5'>
						<LetterPicture
							url={selectedChat.imgUrl}
							letter={
								selectedChat.title.charAt(0) === '@'
									? selectedChat.title.charAt(1)
									: selectedChat.title.charAt(0)
							}
						/>
					</div>

					<div className='flex flex-col'>
						<h1 className='text-lg leading-5.5 '>{selectedChat.title}</h1>
						<p className='text-sm leading-4.5 text-text-secondary max-w-100 whitespace-nowrap overflow-hidden text-ellipsis'>
							{selectedChat.usersCount != null
								? `${selectedChat.usersCount} ${selectedChat.usersCount === 1 ? 'subscriber' : 'subscribers'}`
								: selectedChat.description}
						</p>
					</div>
				</button>
				<Popover>
					{({ open }) => (
						<>
							<PopoverButton as={ButtonIcon}>
								<EllipsisVertical
									size={24}
									className='text-text-secondary'
								/>
							</PopoverButton>
							<TransitionPopover open={open}>
								<PopoverPanel anchor='bottom end'>
									<SettingsPopover
										chatId={selectedChat.id}
										userRole={selectedChat.role}
									/>
								</PopoverPanel>
							</TransitionPopover>
						</>
					)}
				</Popover>
			</header>
			<div className='MessagesArea relative flex-1 overflow-hidden'>
				<MessagesArea chatId={selectedChat.id} />
			</div>
			<ChatInfoDialog
				isOpen={isChaiInfoDialog}
				onClose={setIsChatInfoDialog}
				chat={selectedChat}
			/>
		</main>
	)
}
