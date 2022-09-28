import {
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { isEqual } from 'shared/utils/common/isEqual'

import {
  ExtendedFilterFormFields,
  ExtendedFilterQueries,
} from '../ExtendedFilter/interfaces'
import { DATE_FILTER_FORMAT } from './constants'

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
    olaNextBreachTimeRange,
    searchField,
    searchValue,
    status,
    workGroupId,
  } = fields
  const isAssigned = status.filter(
    (s) =>
      isEqual(s, TaskExtraStatusEnum.Assigned) ||
      isEqual(s, TaskExtraStatusEnum.NotAssigned),
  )

  const statusResult = status.filter((s) => !isAssigned.includes(s))

  return {
    ...(olaNextBreachTimeRange && {
      dateFrom: olaNextBreachTimeRange[0].format(DATE_FILTER_FORMAT),
      dateTo: olaNextBreachTimeRange[1].format(DATE_FILTER_FORMAT),
    }),

    isAssigned: isAssigned as TaskExtraStatusEnum[],
    status: statusResult as TaskStatusEnum[],
    [searchField]: searchValue || undefined,
    workGroupId: workGroupId ? parseInt(workGroupId) : undefined,
  }
}
