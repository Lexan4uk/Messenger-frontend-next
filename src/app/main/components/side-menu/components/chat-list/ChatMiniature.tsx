'use client'

import cn from 'clsx'
import { Dispatch, SetStateAction } from 'react'

import LetterPicture from '@/components/ui/LetterPicture'

import { IChat } from '@/types/chats.types'

import { useSelectedChat } from '@/hooks/useSelectedChat'

interface IChatMiniature {
	chat: IChat
	activeMiniature: string
	setActiveMiniature: Dispatch<SetStateAction<string>>
}

export default function ChatMiniature({
	chat,
	activeMiniature,
	setActiveMiniature
}: IChatMiniature) {
	const { setSelectedChat } = useSelectedChat()

	const toggleMiniatureClick = () => {
		setActiveMiniature(chat.id)
		setSelectedChat(chat)
	}

	return (
		<button
			className={cn(
				'ChatMiniature flex h-18 rounded-xl p-2.25',
				activeMiniature === chat.id ? 'bg-active' : 'hover:bg-fields'
			)}
			onClick={toggleMiniatureClick}
		>
			<div className='mr-2 '>
				<LetterPicture letter={chat.title.charAt(0)} />
			</div>
			<div className='min-w-0 flex-1 flex flex-col justify-between text-left'>
				<h3 className='text-base font-medium truncate'>{chat.title}</h3>
				<p className='truncate'>{chat.description}</p>
			</div>
		</button>
	)
}
