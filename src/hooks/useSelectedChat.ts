'use client'

import { useAtom } from 'jotai'

import { selectedChatAtom } from './atoms/selectedChat.atom'

export function useSelectedChat() {
	const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom)
	return { selectedChat, setSelectedChat }
}
