import { useEffect } from 'react'

import { useGetUserProfileQuery } from 'modules/user/services/userApi.service'

import { showErrorNotification } from 'shared/utils/notifications'

import { userProfileApiMessages } from '../constants/errorMessages'

export const useGetUserProfile = () => {
  const state = useGetUserProfileQuery()

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(userProfileApiMessages.getProfile.commonError)
  }, [state.isError])

  return state
}
