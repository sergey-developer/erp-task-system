import isNumber from 'lodash/isNumber'

import { IdType } from 'shared/types/common'
import { Nullable } from 'shared/types/utils'
import { isNumberArray } from 'shared/utils/array/isNumberArray'
import { isObjectArrayWithId } from 'shared/utils/array/isObjectArrayWithId'

import { useAuthUser } from './useAuthUser'

/**
 * Хук проверяет - принадлежит ли id авторизованному пользователю
 */

export const useIdBelongAuthUser = <T extends IdType | IdType[] | { id: IdType }[]>(
  id: Nullable<T>,
): boolean => {
  const authUser = useAuthUser()

  return authUser && !!id
    ? Array.isArray(id)
      ? isNumberArray(id)
        ? id.includes(authUser.id)
        : isObjectArrayWithId(id)
        ? id.some((obj) => obj.id === authUser.id)
        : false
      : isNumber(id)
      ? authUser.id === id
      : false
    : false
}
