import { useState } from 'react'

import LeftPanelDialog from '@/components/ui/LeftPanelDialog'
import { Loader } from '@/components/ui/Loader'

import { IDialogBase } from '@/types/base.types'

import { useProfile } from '@/hooks/useProfile'

import EditProfile from './EditProfile'
import ProfileData from './ProfileData'

export default function ProfileDialog({ isOpen, onClose }: IDialogBase) {
	const { profileData, isLoading } = useProfile()
	const [editProfile, setEditProfile] = useState(false)

	const leftContent = profileData ? (
		!editProfile ? (
			<ProfileData
				loading={isLoading}
				profileData={profileData}
				onClose={onClose}
				setEditProfile={setEditProfile}
			/>
		) : (
			<EditProfile
				setEditProfile={setEditProfile}
				profileData={profileData}
			/>
		)
	) : (
		<Loader />
	)

	return (
		<LeftPanelDialog
			isOpen={isOpen}
			onClose={() => onClose(false)}
		>
			{leftContent}
		</LeftPanelDialog>
	)
}
