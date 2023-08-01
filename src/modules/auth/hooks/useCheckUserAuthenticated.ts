import { useMemo } from 'react'

import { BaseUserModel } from 'modules/user/models'

import { MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import { useAuthenticatedUser } from './useAuthenticatedUser'

/**
 * Хук для проверки, совпадает ли переданный id, с id авторизованного пользователя
 */

export const useCheckUserAuthenticated = (
  userId: MaybeUndefined<BaseUserModel['id']>,
): boolean => {
  const authenticatedUser = useAuthenticatedUser()

  return useMemo(() => {
    return isEqual(authenticatedUser?.id, userId)
  }, [authenticatedUser, userId])
}
