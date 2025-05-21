import { Dialog, DialogPanel, Transition } from '@headlessui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { Loader } from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

import EditProfile from './EditProfile'
import ProfileData from './ProfileData'

interface IProfileDialog {
	isOpen: boolean
	onClose: Dispatch<SetStateAction<boolean>>
}

export default function ProfileDialog({ isOpen, onClose }: IProfileDialog) {
	const { profileData, isLoading } = useProfile()
	const [editProfile, setEditProfile] = useState(false)

	return (
		<Transition show={isOpen}>
			<Dialog
				open={isOpen}
				onClose={() => {}}
				className='dialog_base  justify-end! dialog-appearance-animation'
			>
				<PanelGroup direction='horizontal'>
					<Panel
						defaultSize={32}
						minSize={20}
						maxSize={32}
					>
						<DialogPanel className='dialog_panel rounded-none h-full p-0! gap-0!'>
							{profileData ? (
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
							)}
						</DialogPanel>
					</Panel>
					<PanelResizeHandle className='w-0.25 cursor-col-resize bg-border' />
					<Panel defaultSize={68}>
						<div className=''></div>
					</Panel>
				</PanelGroup>
			</Dialog>
		</Transition>
	)
}
