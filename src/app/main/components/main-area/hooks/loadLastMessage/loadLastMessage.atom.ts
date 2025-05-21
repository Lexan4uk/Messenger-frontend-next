'use client'

import { atom } from 'jotai'

import { IMessage } from '@/types/message.types'

export const loadLastMessageAtom = atom<IMessage | null>(null)
