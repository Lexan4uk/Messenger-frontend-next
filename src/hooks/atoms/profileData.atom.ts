'use client'

import { atom } from 'jotai'

import { IUser } from '@/types/auth.types'

export const profileDataAtom = atom<IUser | null>(null)
