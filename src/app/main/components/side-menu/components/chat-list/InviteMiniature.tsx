import { Ban, Check } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { EnumInviteStatus, IInviteListItem } from '@/types/invite.types'

import { usePatchInvite } from '../../../main-area/hooks/usePatchInvite'

interface IInviteMiniature {
	invite: IInviteListItem
	setChatMode: Dispatch<SetStateAction<boolean>>
}

export default function InviteMiniature({ invite }: IInviteMiniature) {
	const { patchInvite } = usePatchInvite()
	const checkClick = () => {
		patchInvite({ id: invite.id, status: EnumInviteStatus.accepted })
	}
	const banClick = () => {
		patchInvite({ id: invite.id, status: EnumInviteStatus.declined })
	}
	return (
		<div className='InviteMiniature flex h-18 rounded-xl p-2.25 hover:bg-fields'>
			<div className='min-w-0 flex-1 flex flex-col justify-between text-left'>
				<h3 className='text-base truncate'>
					<span className='font-medium '>User: </span>
					<span className='text-text-secondary'>{invite.senderName}</span>
				</h3>
				<p className='truncate'>
					<span className='font-medium'>Invited you to chat: </span>
					<span className='text-text-secondary'>{invite.chatName}</span>
				</p>
			</div>
			<div className='flex flex-col justify-between'>
				<button onClick={checkClick}>
					<Check
						size={20}
						className='text-text-secondary hover:text-active transition-all duration-200'
					/>
				</button>
				<button onClick={banClick}>
					<Ban
						size={20}
						className='text-text-secondary hover:text-active transition-all duration-200'
					/>
				</button>
			</div>
		</div>
	)
}
