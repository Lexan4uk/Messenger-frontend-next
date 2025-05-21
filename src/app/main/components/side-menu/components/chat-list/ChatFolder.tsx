'use client'

import cn from 'clsx'
import { useEffect, useState } from 'react'

import { Loader } from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'

import { useGetInvites } from '../../../main-area/hooks/useGetInvites'
import { useMiniChats } from '../../hooks/useMiniChats'

import ChatMiniature from './ChatMiniature'
import InviteMiniature from './InviteMiniature'

interface IChatFolders {
	isHidden: boolean
}

export default function ChatFolders({ isHidden }: IChatFolders) {
	const { miniatures, isMiniaturesLoading } = useMiniChats()
	const [activeMiniature, setActiveMiniature] = useState<string>('')
	const { invitesData, isInvitesDataLoading } = useGetInvites()
	const [chatMode, setChatMode] = useState(true)

	useEffect(() => {
		if (invitesData?.length === 0) setChatMode(true)
	})

	return (
		<div className={cn('ChatFolders', isHidden && 'hidden')}>
			{!isInvitesDataLoading && invitesData?.length !== 0 && (
				<div className='py-2'>
					<Button
						className='w-full'
						onClick={() => setChatMode(prev => !prev)}
					>
						{chatMode ? 'You have invites!' : 'Back'}
					</Button>
				</div>
			)}
			{chatMode ? (
				isMiniaturesLoading ? (
					<div className='pt-4'>
						<Loader />
					</div>
				) : !miniatures?.data?.length ? (
					<div className='pt-4 text-center text-text-secondary'>
						No chats found
					</div>
				) : (
					<div className='flex flex-col relative'>
						{miniatures.data.map(chat => (
							<ChatMiniature
								key={chat.id}
								chat={chat}
								activeMiniature={activeMiniature}
								setActiveMiniature={setActiveMiniature}
							/>
						))}
					</div>
				)
			) : (
				<div className='flex flex-col relative'>
					{invitesData &&
						invitesData.map(invite => (
							<InviteMiniature
								key={invite.id}
								invite={invite}
								setChatMode={setChatMode}
							/>
						))}
				</div>
			)}
		</div>
	)
}
