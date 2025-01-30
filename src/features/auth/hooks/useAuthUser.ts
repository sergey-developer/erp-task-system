import { useMemo } from 'react'

import { authUserSelector } from 'features/auth/selectors'
import { UserModel } from 'features/user/models'

import { useSelector } from 'shared/catalogs/hooks/useSelector'
import { MaybeNull } from 'shared/types/utils'

export type UseAuthUserResult = MaybeNull<Pick<UserModel, 'id'>>

/** Возвращает авторизованного пользователя */
export const useAuthUser = (): UseAuthUserResult => {
  const authUser = useSelector(authUserSelector)
  return useMemo(() => (authUser ? { id: authUser.userId } : null), [authUser])
}
