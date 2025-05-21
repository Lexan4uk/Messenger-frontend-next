'use client'

import { useAtom } from 'jotai'

import { loadLastMessageAtom } from './loadLastMessage.atom'

export function useLoadLastMessage() {
	const [lastMessage, setLastMessage] = useAtom(loadLastMessageAtom)
	return { lastMessage, setLastMessage }
}
