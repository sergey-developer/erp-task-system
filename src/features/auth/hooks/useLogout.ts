import { useCallback } from 'react'

import { LOGOUT_ERROR_MSG } from 'features/auth/constants'
import { useLogoutMutation } from 'features/auth/services/authApi.service'
import { authLocalStorageService } from 'features/auth/services/authLocalStorage.service'
import { logoutAndClearTokens } from 'features/auth/utils'

import { useDispatch } from 'shared/catalogs/hooks/useDispatch'
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
      showErrorNotification(LOGOUT_ERROR_MSG)
    }
  }, [dispatch, mutation])

  return { fn, state }
}
