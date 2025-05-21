'use client'

import { atom } from 'jotai'

import { IChat } from '@/types/chats.types'

export const selectedChatAtom = atom<IChat | null>(null)
