import { useCallback } from 'react'

import { useLogoutMutation } from 'modules/auth/services/authApi.service'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import logoutAndClearTokens from 'modules/auth/utils/logoutAndClearTokens'
import useDispatch from 'shared/hooks/useDispatch'
import { showErrorNotification } from 'shared/utils/notifications'

import { LOGOUT_ERROR_MSG } from '../constants/messages'

const useLogout = () => {
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

export default useLogout
