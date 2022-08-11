import { useCallback } from 'react'

import { useLogoutMutation } from 'modules/auth/services/authApi.service'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import useDispatch from 'shared/hooks/useDispatch'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

import { logout as logoutAction } from '../authSlice'

const useLogout = () => {
  const dispatch = useDispatch()
  const [mutation, state] = useLogoutMutation()

  const fn = useCallback(async () => {
    try {
      const refreshToken = authLocalStorageService.getRefreshToken()

      if (refreshToken) {
        await mutation({ refresh: refreshToken }).unwrap()

        authLocalStorageService.removeRefreshToken()
        authLocalStorageService.removeAccessToken()

        dispatch(logoutAction())
      } else {
        showErrorNotification('Ошибка выхода из системы')
      }
    } catch (exception) {
      const error = exception as ErrorResponse
      const errorDetail = getErrorDetail(error)
      showMultipleErrorNotification(errorDetail)
    }
  }, [dispatch, mutation])

  return { fn, state }
}

export default useLogout
