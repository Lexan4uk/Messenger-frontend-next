import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { IMessage } from '@/types/message.types'

import { useProfile } from '@/hooks/useProfile'

import { useLoadLastMessage } from '../hooks/loadLastMessage/useLoadLastMessage'
import { useGetMessages } from '../hooks/useGetMessages'

import ChattingField from './chatting-field/ChattingField'
import ChattingFieldBlock from './chatting-field/ChattingFieldBlock'
import GroupedMessages from './messages-display/GroupedMessages'

interface IMessagesArea {
	chatId: string
}

export default function MessagesArea({ chatId }: IMessagesArea) {
	const { messagesData, isSuccess, fetchMore } = useGetMessages({
		chatId,
		take: 25
	})

	const [loadedMessages, setLoadedMessages] = useState<IMessage[]>([])
	const [hasMore, setHasMore] = useState(true)

	const { lastMessage } = useLoadLastMessage()

	const wrapperRef = useRef<HTMLDivElement>(null)
	const [scrollHeight, setScrollHeight] = useState<number | undefined>(
		undefined
	)
	const { profileData } = useProfile()

	useEffect(() => {
		if (wrapperRef.current) {
			setScrollHeight(wrapperRef.current.clientHeight)
		}
		const handleResize = () => {
			if (wrapperRef.current) {
				setScrollHeight(wrapperRef.current.clientHeight)
			}
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		//without this InfiniteScroll is breaking when the user selects a chat twice
		setHasMore(true)
	}, [chatId])

	useEffect(() => {
		if (isSuccess && messagesData?.data) {
			setLoadedMessages(messagesData.data)
		}
	}, [isSuccess, messagesData])

	useEffect(() => {
		if (!lastMessage) return
		const alreadyExists = loadedMessages.some(msg => msg.id === lastMessage.id)
		if (!alreadyExists) {
			setLoadedMessages(prev => [lastMessage, ...prev])
		}
	}, [lastMessage, loadedMessages])

	const fetchMoreData = async () => {
		if (loadedMessages.length === 0) return

		const lastMessageId = loadedMessages[loadedMessages.length - 1].id
		const newMessages = await fetchMore(lastMessageId)

		if (newMessages.length > 0) {
			setLoadedMessages(prev => [...prev, ...newMessages])
		} else {
			setHasMore(false)
		}
	}

	return (
		<div className='mx-auto grid w-150 h-full relative'>
			<div
				className='flex flex-1 px-4'
				ref={wrapperRef}
			>
				{scrollHeight && (
					<InfiniteScroll
						key={chatId}
						dataLength={loadedMessages.length}
						next={fetchMoreData}
						hasMore={hasMore}
						loader={''}
						height={scrollHeight}
						scrollableTarget='scrollableDiv'
						className='flex flex-1 flex-col-reverse pr-2 messages-scroll'
						inverse={true}
					>
						<GroupedMessages messages={loadedMessages} />
					</InfiniteScroll>
				)}
			</div>
			{profileData?.name ? (
				<ChattingField chatId={chatId} />
			) : (
				<ChattingFieldBlock />
			)}
		</div>
	)
}
