import {
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { isEqual } from 'shared/utils/common/isEqual'
import formatDate from 'shared/utils/date/formatDate'

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
  const { completeAt, searchField, searchValue, status, workGroupId } = fields

  const isAssigned = status.filter(
    (s) =>
      isEqual(s, TaskExtraStatusEnum.Assigned) ||
      isEqual(s, TaskExtraStatusEnum.NotAssigned),
  )

  const statusResult = status.filter((s) => !isAssigned.includes(s))

  return {
    completeAtFrom: completeAt?.[0]
      ? formatDate(completeAt[0], DATE_FILTER_FORMAT)
      : undefined,
    completeAtTo: completeAt?.[1]
      ? formatDate(completeAt[1], DATE_FILTER_FORMAT)
      : undefined,

    isAssigned: isAssigned as TaskExtraStatusEnum[],
    status: statusResult as TaskStatusEnum[],
    [searchField]: searchValue || undefined,
    workGroupId: workGroupId ? parseInt(workGroupId) : undefined,
  }
}
