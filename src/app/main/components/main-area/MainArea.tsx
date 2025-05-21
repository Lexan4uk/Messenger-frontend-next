'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { EllipsisVertical } from 'lucide-react'

import LetterPicture from '@/components/ui/LetterPicture'
import TransitionPopover from '@/components/ui/TransitionPopover'
import { ButtonIcon } from '@/components/ui/buttons/ButtonIcon'

import { useSelectedChat } from '@/hooks/useSelectedChat'

import SettingsPopover from './chat-settings/SettingsPopover'
import MessagesArea from './components/MessagesArea'

export default function MainArea() {
	const { selectedChat } = useSelectedChat()

	return !selectedChat ? (
		''
	) : (
		<main className='MainArea flex flex-col w-full relative'>
			<header className='flex h-13 px-3 py-1.5 items-center content-between bg-background-secondary'>
				<div className='flex h-full w-full'>
					<div className='mr-2.5'>
						<LetterPicture letter={selectedChat.title.charAt(0)} />
					</div>

					<div className='flex flex-col'>
						<h1 className='text-lg leading-5.5 '>{selectedChat.title}</h1>
						<p className='text-sm leading-4.5 text-text-secondary max-w-100 whitespace-nowrap overflow-hidden text-ellipsis'>
							{selectedChat.description}
						</p>
					</div>
				</div>
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
									<SettingsPopover chatId={selectedChat.id} />
								</PopoverPanel>
							</TransitionPopover>
						</>
					)}
				</Popover>
			</header>
			<div className='MessagesArea relative flex-1 overflow-hidden'>
				<MessagesArea chatId={selectedChat.id} />
			</div>
		</main>
	)
}
