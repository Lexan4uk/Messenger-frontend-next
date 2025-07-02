import { Dialog, DialogPanel, Transition } from '@headlessui/react'
import { ReactNode } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

interface ILeftPanelDialog {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

export default function LeftPanelDialog({
	isOpen,
	onClose,
	children
}: ILeftPanelDialog) {
	return (
		<Transition show={isOpen}>
			<Dialog
				open={isOpen}
				onClose={() => {}}
				className='dialog_base justify-end! dialog-appearance-animation'
			>
				<PanelGroup direction='horizontal'>
					<Panel
						defaultSize={32}
						minSize={20}
						maxSize={32}
					>
						<DialogPanel className='dialog_panel rounded-none h-full p-0! gap-0!'>
							{children}
						</DialogPanel>
					</Panel>
					<PanelResizeHandle className='w-0.25 cursor-col-resize bg-border' />
					<Panel defaultSize={68}>
						<div className='' />
					</Panel>
				</PanelGroup>
			</Dialog>
		</Transition>
	)
}
