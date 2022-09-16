import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { RoutesEnum } from 'configs/routes'
import { login as loginAction } from 'modules/auth/auth.slice'
import { LoginFormFields } from 'modules/auth/features/Login/components/LoginPage/interfaces'
import { useLoginMutation } from 'modules/auth/services/authApi.service'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import parseJwt from 'modules/auth/utils/parseJwt'
import useDispatch from 'shared/hooks/useDispatch'

const useLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mutation, state] = useLoginMutation()

  const fn = useCallback(
    async (fields: LoginFormFields) => {
      const response = await mutation(fields).unwrap()

      authLocalStorageService.setAccessToken(response.access)
      authLocalStorageService.setRefreshToken(response.refresh)

      dispatch(loginAction({ user: parseJwt(response.access), ...response }))
      navigate(RoutesEnum.Root)
    },
    [dispatch, mutation, navigate],
  )

  return { fn, state }
}

export default useLogin
