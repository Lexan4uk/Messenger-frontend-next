import { Image } from '@imagekit/next'
import cn from 'clsx'
import { ArrowLeft, AtSign, Loader, Pencil } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/buttons/Button'
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
			<div className='flex flex-col'>
				<div
					className={cn(
						'flex items-center justify-center border-b border-border relative group',
						loading && 'p-10'
					)}
				>
					{profileData?.imgUrl ? (
						<>
							{profileData?.name && (
								<div className='absolute bottom-0 left-0 px-6 pb-2 text-xl font-medium'>
									<span className='rounded-2xl bg-fields px-2 py-0.5 border border-border'>
										{profileData.name}
									</span>
								</div>
							)}
							{loading ? (
								<Loader />
							) : (
								<Image
									src={profileData.imgUrl}
									width={400}
									height={500}
									alt='Error while loading image'
								/>
							)}
						</>
					) : (
						<div className='flex items-center justify-center w-full h-full p-10 text-active'>
							<Button onClick={() => setEditProfile(true)}>
								Add an avatar
							</Button>
						</div>
					)}
				</div>
			</div>
			<div className='flex flex-col p-3'>
				<button
					onClick={() => {
						if (profileData?.login) {
							navigator.clipboard.writeText(profileData.login)
							toast('Copied to clipboard')
						}
					}}
					className='flex items-center rounded-xl py-2.25 px-4 hover:bg-fields cursor-pointer'
				>
					<AtSign className='text-text-secondary mr-7' />
					<div className=' flex flex-col text-start'>
						<p className='text-lg'>{profileData?.login}</p>
						<p className='text-text-secondary text-sm'>Username</p>
					</div>
				</button>
			</div>
		</>
	)
}
