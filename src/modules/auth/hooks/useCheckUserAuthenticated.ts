import { useMemo } from 'react'

import { UserModel } from 'modules/user/models'
import { MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import useAuthenticatedUser from './useAuthenticatedUser'

/**
 * Хук для проверки, совпадает ли переданный id, с id авторизованного пользователя
 */

const useCheckUserAuthenticated = (
  userId: MaybeUndefined<UserModel['id']>,
): boolean => {
  const authenticatedUser = useAuthenticatedUser()

  return useMemo(() => {
    return isEqual(authenticatedUser?.id, userId)
  }, [authenticatedUser, userId])
}

export default useCheckUserAuthenticated
