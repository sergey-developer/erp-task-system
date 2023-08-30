import {
  ExtendedFilterFormFields,
  ExtendedFilterQueries,
} from 'modules/task/components/ExtendedFilter/types'
import { FastFilterEnum } from 'modules/task/components/FastFilterList/constants'
import { UserRoleEnum } from 'modules/user/constants'
import { getUserRoleMap } from 'modules/user/utils'

import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

/**
 * Преобразует объект с полями формы расширенной фильтрации в объект с
 * query параметрами расширенной фильтрации
 * @function mapExtendedFilterFormFieldsToQueries
 * @param {ExtendedFilterFormFields} fields - объект со значениями формы расширенной фильтрации
 * @returns {ExtendedFilterQueries} объект с query параметрами расширенной фильтрации
 */

export const mapExtendedFilterFormFieldsToQueries = (
  fields: ExtendedFilterFormFields,
): ExtendedFilterQueries => {
  const {
    completeAt,
    searchField,
    searchValue,
    status,
    isOverdue,
    isAssigned,
    workGroupId,
    manager,
  } = fields

  return {
    completeAtFrom: completeAt?.[0] ? formatDate(completeAt[0], DATE_FILTER_FORMAT) : undefined,
    completeAtTo: completeAt?.[1] ? formatDate(completeAt[1], DATE_FILTER_FORMAT) : undefined,

    status,
    isOverdue,
    isAssigned,
    [searchField]: searchValue || undefined,
    workGroupId: workGroupId ? parseInt(workGroupId) : undefined,
    manager,
  }
}

export const getInitialFastFilter = (role?: UserRoleEnum): FastFilterEnum => {
  if (!role) return FastFilterEnum.All

  const { isFirstLineSupportRole, isEngineerRole } = getUserRoleMap(role)

  return isFirstLineSupportRole
    ? FastFilterEnum.FirstLine
    : isEngineerRole
    ? FastFilterEnum.Mine
    : FastFilterEnum.All
}
