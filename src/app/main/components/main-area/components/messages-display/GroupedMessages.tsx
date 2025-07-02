'use client'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import calendar from 'dayjs/plugin/calendar'

import { IMessage } from '@/types/message.types'

import { useProfile } from '@/hooks/useProfile'

import MessageElement from './MessageElement'

dayjs.extend(calendar)

interface IGroupedMessages {
	messages: IMessage[]
}

export default function GroupedMessages({ messages }: IGroupedMessages) {
	const { profileData } = useProfile()

	// Check if messages array is empty
	if (messages.length === 0) {
		return (
			<div className='text-center text-sm py-4'>
				<div className='bg-black/30 w-fit rounded-xl py-0.75 px-2 mx-auto'>
					Send first message!
				</div>
			</div>
		)
	}

	const grouped = messages.reduce<Record<string, IMessage[]>>((acc, msg) => {
		const dateKey = dayjs(msg.createdAt).format('YYYY-MM-DD')
		if (!acc[dateKey]) acc[dateKey] = []
		acc[dateKey].push(msg)
		return acc
	}, {})

	const sortedDates = Object.keys(grouped).sort(
		(a, b) => dayjs(b).unix() - dayjs(a).unix()
	)

	return (
		<>
			{sortedDates.map(dateKey => (
				<div
					key={dateKey}
					className='DateGroup flex flex-col-reverse gap-2'
				>
					{grouped[dateKey].map(message => (
						<MessageElement
							key={message.id}
							data={message}
							isSender={message.sender.login === profileData?.login}
						/>
					))}
					<div className='text-center text-sm py-4 flex justify-center'>
						<div className='bg-black/30 w-fit rounded-xl	py-0.75 px-2'>
							{dayjs(dateKey).calendar(null, {
								sameDay: '[Today]',
								lastDay: '[Yesterday]',
								lastWeek: 'D MMMM YYYY',
								sameElse: 'D MMMM YYYY'
							})}
						</div>
					</div>
				</div>
			))}
		</>
	)
}
