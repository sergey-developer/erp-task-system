import get from 'lodash/get'

import { DEFAULT_SEARCH_FIELD } from 'modules/task/components/ExtendedFilter/constants'
import { ExtendedFilterFormFields } from 'modules/task/components/ExtendedFilter/types'
import { FastFilterEnum } from 'modules/task/constants/task'
import { ExtendedFilterQueries } from 'modules/task/models'
import { TaskListPageFiltersStorage } from 'modules/task/services/taskLocalStorage/taskLocalStorage.service'
import { UserRoleEnum } from 'modules/user/constants'
import { getUserRoleMap } from 'modules/user/utils'

import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { Nullable } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

/**
 * Преобразует объект с полями формы расширенной фильтрации в объект с
 * query параметрами расширенной фильтрации
 * @function mapExtendedFilterFormFieldsToQueries
 * @param {ExtendedFilterFormFields} fields - объект со значениями формы расширенной фильтрации
 * @returns {ExtendedFilterQueries} объект с query параметрами расширенной фильтрации
 */

export const mapExtendedFilterFormFieldsToQueries = (
  fields: Partial<ExtendedFilterFormFields>,
): ExtendedFilterQueries => {
  const {
    completeAt,
    searchField,
    searchValue,
    // todo: раскомитить во время задачи по интеграции
    customers,
    macroregions,
    supportGroups,
  } = fields

  return {
    ...fields,
    completeAtFrom: completeAt?.[0] ? formatDate(completeAt[0], DATE_FILTER_FORMAT) : undefined,
    completeAtTo: completeAt?.[1] ? formatDate(completeAt[1], DATE_FILTER_FORMAT) : undefined,
    ...(searchField && searchValue && { [searchField]: searchValue }),
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

export const getInitialExtendedFilterFormValues = (
  preloadedFilters?: Nullable<TaskListPageFiltersStorage>,
): Readonly<ExtendedFilterFormFields> => ({
  completeAt: [],
  searchField: DEFAULT_SEARCH_FIELD,
  searchValue: undefined,
  status: [],
  isOverdue: [],
  isAssigned: [],
  workGroupId: undefined,
  manager: undefined,
  customers: get(preloadedFilters, 'customers', []),
  macroregions: get(preloadedFilters, 'macroregions', []),
  supportGroups: get(preloadedFilters, 'supportGroups', []),
})
