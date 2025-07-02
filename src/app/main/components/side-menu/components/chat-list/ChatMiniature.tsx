'use client'

import cn from 'clsx'
import { Megaphone } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import LetterPicture from '@/components/ui/LetterPicture'

import { EnumChatType, IChat } from '@/types/chats.types'

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
				<LetterPicture
					url={chat.imgUrl}
					letter={
						chat.title.charAt(0) === '@'
							? chat.title.charAt(1)
							: chat.title.charAt(0)
					}
				/>
			</div>
			<div className='min-w-0 flex-1 flex flex-col justify-between text-left'>
				<div className='flex gap-1'>
					{chat.type === EnumChatType.group && (
						<Megaphone
							className={cn(
								activeMiniature === chat.id
									? 'text-text'
									: 'text-text-secondary'
							)}
						/>
					)}

					<h3 className='text-base font-medium truncate'>{chat.title}</h3>
				</div>

				<p
					className={cn(
						'truncate',
						activeMiniature === chat.id ? 'text-text' : 'text-text-secondary'
					)}
				>
					{chat.description}
				</p>
			</div>
		</button>
	)
}
