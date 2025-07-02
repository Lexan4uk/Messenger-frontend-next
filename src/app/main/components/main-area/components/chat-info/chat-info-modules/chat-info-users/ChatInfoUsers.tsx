import { Loader } from '@/components/ui/Loader'

import { EnumRole, IChatUser } from '@/types/chats.types'

import { useProfile } from '@/hooks/useProfile'

import { useGetChatUsers } from '../../../../hooks/useGetChatUsers'

import ChatInfoUser from './ChatInfoUser'

interface IChatInfoUsers {
	chatId: string
	clientRole: EnumRole
	clientLogin?: string
}
export default function ChatInfoUsers({ chatId, clientRole }: IChatInfoUsers) {
	const { getChatUsers, isGetChatUsersPending } = useGetChatUsers(chatId)
	const { profileData } = useProfile()

	const sortedUsers = getChatUsers?.data
		?.slice() // копируем, чтобы не мутировать оригинал
		.sort((a, b) => {
			// 1. Сначала по роли: admin выше user
			if (a.role === EnumRole.admin && b.role !== EnumRole.admin) return -1
			if (a.role !== EnumRole.admin && b.role === EnumRole.admin) return 1

			return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
		})
	const computeActions = (user: IChatUser) => {
		if (user.login === profileData?.login) return false
		if (user.role === EnumRole.user && clientRole === EnumRole.admin)
			return true
		if (user.role === EnumRole.admin && clientRole === EnumRole.admin)
			return false
		return false
	}
	return (
		<div className='flex-1 relative p-3'>
			{isGetChatUsersPending ? (
				<div className='h-full flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				<div className='flex flex-col '>
					{sortedUsers?.map((user, index) => (
						<ChatInfoUser
							key={index}
							user={user}
							actions={computeActions(user)}
							chatId={chatId}
						/>
					))}
				</div>
			)}
		</div>
	)
}
