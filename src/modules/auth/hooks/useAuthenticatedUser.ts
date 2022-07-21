import { useMemo } from 'react'

import useSelector from 'shared/hooks/useSelector'
import { MaybeNull } from 'shared/interfaces/utils'

import { AuthenticatedUser } from '../interfaces'
import { authenticatedUserSelector } from '../selectors'

type UseAuthenticatedUserReturnType = MaybeNull<{
  id: AuthenticatedUser['userId']
  role: AuthenticatedUser['userRole']
}>

/**
  Хук возвращает авторизованного пользователя
 */

const useAuthenticatedUser = (): UseAuthenticatedUserReturnType => {
  const authenticatedUser = useSelector(authenticatedUserSelector)

  return useMemo(() => {
    return authenticatedUser
      ? { role: authenticatedUser.userRole, id: authenticatedUser.userId }
      : null
  }, [authenticatedUser])
}

export default useAuthenticatedUser
