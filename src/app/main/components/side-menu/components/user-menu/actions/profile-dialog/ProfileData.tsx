import cn from 'clsx'
import { ArrowLeft, AtSign, Pencil } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import LetterPicture from '@/components/ui/LetterPicture'
import { ButtonIcon } from '@/components/ui/buttons/ButtonIcon'

import { IUser } from '@/types/auth.types'

interface IProfileData {
	profileData: IUser
	loading: boolean
	onClose: Dispatch<SetStateAction<boolean>>
	setEditProfile: Dispatch<SetStateAction<boolean>>
}
export default function ProfileData({
	profileData,
	loading,
	onClose,
	setEditProfile
}: IProfileData) {
	return (
		<>
			<header className='py-1.5 px-3 flex border-b border-border'>
				<ButtonIcon onClick={() => onClose(false)}>
					<ArrowLeft
						size={24}
						className='text-text-secondary'
					/>
				</ButtonIcon>
				<div className='flex flex-1 justify-between items-center'>
					<p className='ml-5.5 text-xl font-medium'>Settings</p>
					<ButtonIcon onClick={() => setEditProfile(true)}>
						<Pencil
							size={24}
							className='text-text-secondary'
						/>
					</ButtonIcon>
				</div>
			</header>
			<div className='flex flex-col h-full'>
				<div
					className={cn(
						'flex items-center justify-center h-30/100 border-b border-border relative group',
						loading && 'p-10'
					)}
				>
					<div className='absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none' />
					<div className='absolute bottom-2 left-6 text-xl font-medium z-20 text-white'>
						<span className='px-2 py-0.5'>{profileData.name}</span>
					</div>
					<LetterPicture
						url={profileData.imgUrl}
						letter={
							profileData.name
								? profileData.name.charAt(0)
								: profileData.login.charAt(0)
						}
						addStyle='w-full rounded-none text-[160px]'
					/>
				</div>
				<div className='flex flex-col p-3 '>
					<button
						onClick={() => {
							if (profileData?.login) {
								navigator.clipboard.writeText(profileData.login)
								toast('Copied to clipboard')
							}
						}}
						className='flex items-center rounded-xl py-2.25 px-4 hover:bg-fields cursor-pointer'
					>
						<div className='mr-7'>
							<AtSign className='text-text-secondary' />
						</div>
						<div className=' flex flex-col text-start'>
							<p className='text-lg'>{profileData?.login}</p>
							<p className='text-text-secondary text-sm'>Username</p>
						</div>
					</button>
				</div>
			</div>
		</>
	)
}
