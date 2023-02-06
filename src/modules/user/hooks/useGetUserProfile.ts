import { useEffect } from 'react'

import { useGetUserProfileQuery } from 'modules/user/services/userApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetUserProfile = () => {
  const state = useGetUserProfileQuery()

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification('Не удалось получить профиль пользователя')
  }, [state.isError])

  return state
}
