import { useCallback } from 'react'

import { useLogoutMutation } from 'modules/auth/services/auth.service'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import useDispatch from 'shared/hooks/useDispatch'

import { logout as logoutAction } from '../authSlice'

const useLogout = () => {
  const dispatch = useDispatch()
  const [logout] = useLogoutMutation()

  return useCallback(async () => {
    const refreshToken = authLocalStorageService.getRefreshToken()

    if (refreshToken) {
      await logout({ refresh: refreshToken }).unwrap()
    }

    authLocalStorageService.removeAccessToken()
    authLocalStorageService.removeRefreshToken()

    dispatch(logoutAction())
  }, [dispatch, logout])
}

export default useLogout
