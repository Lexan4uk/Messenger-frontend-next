'use client'

import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { profileDataAtom } from './atoms/profileData.atom'
import { userService } from '@/services/user.service'

export function useProfile() {
	const {
		data: queryData,
		isLoading,
		isSuccess
	} = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile()
	})
	const [profileData, setProfileData] = useAtom(profileDataAtom)

	useEffect(() => {
		if (queryData?.user) setProfileData(queryData.user)
	}, [queryData, profileData])
	return { profileData, isLoading, isSuccess }
}
