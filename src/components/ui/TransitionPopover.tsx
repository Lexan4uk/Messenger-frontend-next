import { Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface ITransitionPopover {
	open: boolean
	children: ReactNode
}

const TransitionPopover = ({ open, children }: ITransitionPopover) => (
	<Transition
		as={Fragment}
		show={open}
		enter='transition ease-out duration-200'
		enterFrom='opacity-0 -translate-y-1'
		enterTo='opacity-100 translate-y-0'
		leave='transition ease-in duration-150'
		leaveFrom='opacity-100 translate-y-0'
		leaveTo='opacity-0 -translate-y-1'
	>
		{children}
	</Transition>
)

export default TransitionPopover
