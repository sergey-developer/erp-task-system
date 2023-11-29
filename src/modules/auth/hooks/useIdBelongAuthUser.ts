import isEqual from 'lodash/isEqual'

import { IdType } from 'shared/types/common'

import { useAuthUser } from './useAuthUser'

/**
 * Хук проверяет - принадлежит ли id авторизованному пользователю
 */

export const useIdBelongAuthUser = (id?: IdType): boolean => {
  const authUser = useAuthUser()
  return isEqual(authUser?.id, id)
}
