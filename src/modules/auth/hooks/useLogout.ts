import { useCallback } from 'react'

import { LOGOUT_ERROR_MSG } from 'modules/auth/constants'
import { useLogoutMutation } from 'modules/auth/services/authApi.service'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import { logoutAndClearTokens } from 'modules/auth/utils'

import { useDispatch } from 'shared/hooks'
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
