'use client'

import { Popover, PopoverButton } from '@headlessui/react'
import cn from 'clsx'
import { Check } from 'lucide-react'

interface IEditProfileSaveButton {
	isDirty: boolean
	onClick: () => void
	classNameBlock?: string
}

export default function EditProfileSaveButton({
	isDirty,
	onClick,
	classNameBlock
}: IEditProfileSaveButton) {
	return (
		<Popover>
			{() => (
				<PopoverButton
					onClick={onClick}
					className={cn(
						'p-4 rounded-full block bg-purple-button-active hover:bg-active absolute bottom-4 right-4',
						'transition-all duration-200 text-white',
						'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0',
						'focus:outline-none',
						isDirty && 'opacity-100! translate-y-0!',
						classNameBlock
					)}
				>
					<Check />
				</PopoverButton>
			)}
		</Popover>
	)
}
