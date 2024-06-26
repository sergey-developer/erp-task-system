import { useMemo } from 'react'

import { authUserSelector } from 'modules/auth/selectors'
import { AuthenticatedUser } from 'modules/auth/types'

import { useSelector } from 'shared/hooks/useSelector'
import { MaybeNull } from 'shared/types/utils'

type UseAuthUserResult = MaybeNull<{
  id: AuthenticatedUser['userId']
}>

/** Возвращает авторизованного пользователя */
export const useAuthUser = (): UseAuthUserResult => {
  const authUser = useSelector(authUserSelector)
  return useMemo(() => (authUser ? { id: authUser.userId } : null), [authUser])
}
