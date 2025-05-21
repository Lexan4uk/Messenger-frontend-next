'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import cn from 'clsx'
import { AlignJustify, ArrowLeft, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import TransitionPopover from '@/components/ui/TransitionPopover'
import { ButtonIcon } from '@/components/ui/buttons/ButtonIcon'
import { TransparentField } from '@/components/ui/fields/TransparentField'

import { useProfile } from '@/hooks/useProfile'

import ChatFolders from './components/chat-list/ChatFolder'
import SearchList from './components/search-list/SearchList'
import SideMenuActionsButton from './components/side-menu-action/SideMenuActionsButton'
import UserSettingsPopover from './components/user-menu/UserSettingsPopover'

export default function SideMenu() {
	const { register, setValue, watch } = useForm({
		mode: 'onChange'
	})
	const [isSearchMode, setIsSearchMode] = useState(false)
	const searchValue = watch('search')

	const { profileData } = useProfile()

	const clearSearch = () => {
		setValue('search', '')
		setIsSearchMode(false)
	}

	return (
		<aside className='LeftColumn bg-background-secondary flex flex-col min-h-screen'>
			<div className='LeftColumnHeader flex px-3 py-1.5 items-center'>
				{isSearchMode ? (
					<ButtonIcon onClick={() => setIsSearchMode(false)}>
						<ArrowLeft
							size={24}
							className='text-text-secondary'
						/>
					</ButtonIcon>
				) : (
					<Popover>
						{({ open }) => (
							<>
								<PopoverButton as={ButtonIcon}>
									<AlignJustify
										size={24}
										className='text-text-secondary'
									/>
								</PopoverButton>
								{profileData && (
									<TransitionPopover open={open}>
										<PopoverPanel anchor='bottom start'>
											<UserSettingsPopover user={profileData} />
										</PopoverPanel>
									</TransitionPopover>
								)}
							</>
						)}
					</Popover>
				)}
				<form className='flex-1'>
					<div
						className={cn(
							'bg-fields flex rounded-full ml-2.5 items-center',
							isSearchMode && 'ring-2 ring-active'
						)}
					>
						<div className='ml-3'>
							<Search
								className={cn(
									'ml-3 ',
									isSearchMode ? 'text-active' : 'text-icon-inactive'
								)}
							/>
						</div>

						<TransparentField
							placeholder='Search'
							id='search'
							extra='p-2 w-full'
							onFocus={() => setIsSearchMode(true)}
							{...register('search')}
						/>
						{searchValue && (
							<ButtonIcon
								onClick={clearSearch}
								type='button'
							>
								<X className='text-text-secondary' />
							</ButtonIcon>
						)}
					</div>
				</form>
			</div>
			<div className='p-2 group relative flex-1'>
				<ChatFolders isHidden={isSearchMode} />
				{isSearchMode && <SearchList />}
				<SideMenuActionsButton classNameBlock='absolute bottom-4 right-4' />
			</div>
		</aside>
	)
}
