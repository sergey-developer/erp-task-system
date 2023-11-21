import { useMemo } from 'react'

import { useSelector } from 'shared/hooks/useSelector'
import { MaybeNull } from 'shared/types/utils'

import { authenticatedUserSelector } from '../selectors'
import { AuthenticatedUser } from '../types'

type UseAuthenticatedUserResult = MaybeNull<{
  id: AuthenticatedUser['userId']
  role: AuthenticatedUser['userRole']
}>

/**
 Хук возвращает авторизованного пользователя
 */

export const useAuthUser = (): UseAuthenticatedUserResult => {
  const authenticatedUser = useSelector(authenticatedUserSelector)

  return useMemo(() => {
    return authenticatedUser
      ? { role: authenticatedUser.userRole, id: authenticatedUser.userId }
      : null
  }, [authenticatedUser])
}
