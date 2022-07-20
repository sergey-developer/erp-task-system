import { useCallback } from 'react'

import { StorageKeys } from 'shared/constants/storage'
import useDispatch from 'shared/hooks/useDispatch'
import localStorageService from 'shared/services/localStorage'

import { useLogoutMutation } from '../auth.service'
import { logout as logoutAction } from '../authSlice'

const useLogout = () => {
  const dispatch = useDispatch()
  const [logout] = useLogoutMutation()

  return useCallback(async () => {
    const refreshToken = localStorageService.getItem(StorageKeys.refreshToken)

    if (refreshToken) {
      await logout({ refresh: refreshToken }).unwrap()
    }

    localStorageService.removeItem(StorageKeys.accessToken)
    localStorageService.removeItem(StorageKeys.refreshToken)

    dispatch(logoutAction())
  }, [dispatch, logout])
}

export default useLogout
