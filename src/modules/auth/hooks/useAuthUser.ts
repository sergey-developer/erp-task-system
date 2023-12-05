import { authUserSelector } from 'modules/auth/selectors'
import { AuthenticatedUser } from 'modules/auth/types'

import { useSelector } from 'shared/hooks/useSelector'
import { MaybeNull } from 'shared/types/utils'

type UseAuthUserResult = MaybeNull<{
  id: AuthenticatedUser['userId']
  role: AuthenticatedUser['userRole']
}>

/**
 Хук возвращает авторизованного пользователя
 */

export const useAuthUser = (): UseAuthUserResult => {
  const authUser = useSelector(authUserSelector)
  return authUser ? { role: authUser.userRole, id: authUser.userId } : null
}
