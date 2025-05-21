import { Image, upload } from '@imagekit/next'
import { ArrowLeft, ImagePlus } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Loader } from '@/components/ui/Loader'
import { ButtonIcon } from '@/components/ui/buttons/ButtonIcon'
import { TransparentField } from '@/components/ui/fields/TransparentField'

import { IUser, IUserUpdate } from '@/types/auth.types'

import { useProfileUpdate } from '@/hooks/useProfileUpdate'

import EditProfileSaveButton from './EditProfileSaveButton'
import ImageKitProps from './ImageKitProps'

interface IEditProfile {
	setEditProfile: Dispatch<SetStateAction<boolean>>
	profileData: IUser
}
export default function EditProfile({
	setEditProfile,
	profileData
}: IEditProfile) {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const { updateProfile, updatePending } = useProfileUpdate()

	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty }
	} = useForm<IUserUpdate>({
		mode: 'onChange'
	})

	useEffect(() => {
		if (profileData) {
			reset({
				login: profileData.login || '',
				name: profileData.name || ''
			})
		}
	}, [profileData, reset])

	const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0] ?? null
		if (!selectedFile) return
		await handleUpload(selectedFile)
	}

	const handleUpload = async (selectedFile: File) => {
		const { token, expire, signature, publicKey } = await ImageKitProps()

		const response = await upload({
			file: selectedFile,
			fileName: selectedFile.name,
			folder: 'tegram/users/avatars',
			isPrivateFile: false,
			useUniqueFileName: true,
			signature,
			token,
			expire,
			publicKey: publicKey || ''
		})

		if (!response) {
			toast('Error while uploading image')
			return
		}

		updateProfile({
			imgUrl: response.url
		})
	}

	return (
		<>
			<header className='py-1.5 px-3 flex border-b border-border'>
				<ButtonIcon onClick={() => setEditProfile(prev => !prev)}>
					<ArrowLeft
						size={24}
						className='text-text-secondary'
					/>
				</ButtonIcon>
				<div className='flex flex-1 justify-between items-center'>
					<p className='ml-5.5 text-xl font-medium'>Edit profile</p>
				</div>
			</header>
			<div className='px-6 py-4 flex flex-col'>
				<div className='mb-8'>
					<div className='flex relative content-center justify-center rounded-full max-w-30 aspect-square mx-auto overflow-hidden border border-border'>
						{profileData.imgUrl ? (
							updatePending ? (
								<div className='m-auto'>
									<Loader />
								</div>
							) : (
								<Image
									src={profileData.imgUrl}
									width={500}
									height={500}
									alt='Error while loading image'
									className={`object-cover h-full`}
								/>
							)
						) : (
							<div className=''></div>
						)}
						<button
							className='w-full h-full bg-background/60 z-10 absolute top-0 left-0 group'
							onClick={() => fileInputRef.current?.click()}
						>
							<ImagePlus
								size={48}
								className='m-auto transition-transform duration-200 group-hover:scale-110'
							/>
						</button>
					</div>
				</div>
				<form className='flex flex-col gap-4.5'>
					<div className='relative rounded-xl border border-text-secondary focus-within:border-active transition-colors'>
						<TransparentField
							maxLength={30}
							id='login'
							placeholder='Enter login:'
							extra='w-full px-4 py-3'
							{...register('login')}
						/>
						<label className='absolute top-1 left-1 scale-[0.75] -translate-y-4 bg-background-secondary px-1.25 text-text-secondary peer-focus:text-active transition-colors'>
							Login
						</label>
					</div>
					<div className='relative rounded-xl border border-text-secondary focus-within:border-active transition-colors'>
						<TransparentField
							maxLength={30}
							id='name'
							placeholder='Enter name:'
							extra='w-full px-4 py-3'
							{...register('name')}
						/>
						<label className='absolute top-1 left-1 scale-[0.75] -translate-y-4 bg-background-secondary px-1.25 text-text-secondary peer-focus:text-active transition-colors'>
							Name (optional)
						</label>
					</div>
				</form>
			</div>
			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				onChange={handleChangeImg}
				disabled={updatePending}
				className='hidden'
			/>
			<EditProfileSaveButton
				isDirty={isDirty}
				onClick={handleSubmit(data => {
					console.log('data', data)
					updateProfile(data)
				})}
			/>
		</>
	)
}
