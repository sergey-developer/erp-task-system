import { useMemo } from 'react'

import { useSelector } from 'shared/hooks'
import { MaybeNull } from 'shared/types/utils'

import { AuthenticatedUser } from '../types'
import { authenticatedUserSelector } from '../selectors'

type UseAuthenticatedUserReturnType = MaybeNull<{
  id: AuthenticatedUser['userId']
  role: AuthenticatedUser['userRole']
}>

/**
  Хук возвращает авторизованного пользователя
 */

export const useAuthenticatedUser = (): UseAuthenticatedUserReturnType => {
  const authenticatedUser = useSelector(authenticatedUserSelector)

  return useMemo(() => {
    return authenticatedUser
      ? { role: authenticatedUser.userRole, id: authenticatedUser.userId }
      : null
  }, [authenticatedUser])
}
