import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { IMessage } from '@/types/message.types'

import socket from '@/config/soket'

import { useGetMessages } from '../hooks/useGetMessages'

import ChattingField from './chatting-field/ChattingField'
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

	useEffect(() => {
		//without this InfiniteScroll is breaking when the user selects a chat twice
		setHasMore(true)
	}, [chatId])

	useEffect(() => {
		socket.emit('joinChat', chatId)

		const handleNewMessage = (message: IMessage) => {
			if (message.chatId !== chatId) return
			//without this refetch is required to update the messages list
			setLoadedMessages(prev => [message, ...prev])
		}

		socket.on('newMessage', handleNewMessage)

		return () => {
			socket.off('newMessage', handleNewMessage)
		}
	}, [chatId])

	useEffect(() => {
		if (isSuccess && messagesData?.data) {
			setLoadedMessages(messagesData.data)
		}
	}, [isSuccess, messagesData])

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
		<div className='flex flex-col h-full w-150 mx-auto relative'>
			<div className='flex-1 overflow-hidden'>
				<div
					id='scrollableDiv'
					className='h-full overflow-y-auto px-4 flex flex-col-reverse relative messages-scroll'
				>
					<InfiniteScroll
						key={chatId}
						dataLength={loadedMessages.length}
						next={fetchMoreData}
						hasMore={hasMore}
						loader={''}
						inverse={true}
						scrollableTarget='scrollableDiv'
						className='flex flex-col-reverse w-full'
					>
						<GroupedMessages messages={loadedMessages} />
					</InfiniteScroll>
				</div>
			</div>

			<ChattingField chatId={chatId} />
		</div>
	)
}
