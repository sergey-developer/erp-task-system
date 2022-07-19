import { useMemo } from 'react'

import { BaseUserModel } from 'modules/user/models'
import { MaybeUndefined } from 'shared/interfaces/utils'

import useAuthenticatedUser from './useAuthenticatedUser'

/**
 * Хук для проверки, совпадает ли переданный id, с id авторизованного пользователя
 */

const useIsAuthenticatedUser = (
  userId: MaybeUndefined<BaseUserModel['id']>,
): boolean => {
  const authenticatedUser = useAuthenticatedUser()

  return useMemo(() => {
    return authenticatedUser ? authenticatedUser.id === userId : false
  }, [authenticatedUser, userId])
}

export default useIsAuthenticatedUser
