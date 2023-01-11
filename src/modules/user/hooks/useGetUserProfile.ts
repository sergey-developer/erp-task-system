import { useEffect } from 'react'

import { showErrorNotification } from 'shared/utils/notifications'

import { useGetUserProfileQuery } from '../services/userApi.service'

export const useGetUserProfile = () => {
  const state = useGetUserProfileQuery()

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification('Не удалось получить профиль пользователя')
  }, [state.isError])

  return state
}
