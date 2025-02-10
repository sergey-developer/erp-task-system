import { useLogoutMutation } from 'features/auth/api/auth.endpoints'
import { logoutErrMsg } from 'features/auth/api/constants'
import { logoutAndClearTokens } from 'features/auth/helpers'
import { authLocalStorageService } from 'features/auth/services/authLocalStorage.service'
import { useCallback } from 'react'

import { useDispatch } from 'shared/hooks/useDispatch'
import { showErrorNotification } from 'shared/utils/notifications'

export const useLogout = () => {
  const dispatch = useDispatch()
  const [mutation, state] = useLogoutMutation()

  const fn = useCallback(async () => {
    try {
      const refreshToken = authLocalStorageService.getRefreshToken()

      if (refreshToken) {
        await mutation({ refresh: refreshToken }).unwrap()
        logoutAndClearTokens(dispatch)
      } else {
        throw new Error()
      }
    } catch {
      showErrorNotification(logoutErrMsg)
    }
  }, [dispatch, mutation])

  return { fn, state }
}
