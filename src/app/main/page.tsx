'use client'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import MainArea from './components/main-area/MainArea'
import SideMenu from './components/side-menu/SideMenu'

export default function Page() {
	return (
		<PanelGroup direction='horizontal'>
			<Panel
				className='relative'
				defaultSize={32}
				minSize={20}
				maxSize={32}
			>
				<SideMenu />
			</Panel>
			<PanelResizeHandle className='w-0.25 cursor-col-resize bg-border' />
			<Panel
				className='flex relative'
				defaultSize={68}
			>
				<MainArea />
			</Panel>
		</PanelGroup>
	)
}
