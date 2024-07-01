import isNumber from 'lodash/isNumber'

import { IdType } from 'shared/types/common'
import { Nullable } from 'shared/types/utils'
import { isNumberArray } from 'shared/utils/array/isNumberArray'
import { isObjectArrayWithId } from 'shared/utils/array/isObjectArrayWithId'

import { useAuthUser } from './useAuthUser'

/** Хук проверяет - принадлежит ли id авторизованному пользователю */

export const useIdBelongAuthUser = <T extends IdType | IdType[] | { id: IdType }[]>(
  value: Nullable<T>,
): boolean => {
  const authUser = useAuthUser()

  return authUser && !!value
    ? Array.isArray(value)
      ? isNumberArray(value)
        ? value.includes(authUser.id)
        : isObjectArrayWithId(value)
        ? value.some((obj) => obj.id === authUser.id)
        : false
      : isNumber(value)
      ? authUser.id === value
      : false
    : false
}
