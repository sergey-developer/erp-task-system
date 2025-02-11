import { authUserSelector } from 'features/auth/store/selectors'
import { UserDetailDTO } from 'features/users/api/dto'
import { useMemo } from 'react'

import { useSelector } from 'shared/hooks/useSelector'
import { MaybeNull } from 'shared/types/utils'

export type UseAuthUserResult = MaybeNull<Pick<UserDetailDTO, 'id'>>

/** Возвращает авторизованного пользователя */
export const useAuthUser = (): UseAuthUserResult => {
  const authUser = useSelector(authUserSelector)
  return useMemo(() => (authUser ? { id: authUser.userId } : null), [authUser])
}
