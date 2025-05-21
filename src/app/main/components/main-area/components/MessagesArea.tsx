import { useEffect, useState } from 'react'
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

	const { profileData } = useProfile()

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

			{profileData?.name ? (
				<ChattingField chatId={chatId} />
			) : (
				<ChattingFieldBlock />
			)}
		</div>
	)
}
