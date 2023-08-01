import {
  ExtendedFilterFormFields,
  ExtendedFilterQueries,
} from 'modules/task/components/ExtendedFilter/interfaces'

import { formatDate } from 'shared/utils/date'

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
    completeAt,
    searchField,
    searchValue,
    status,
    isOverdue,
    isAssigned,
    workGroupId,
  } = fields

  return {
    completeAtFrom: completeAt?.[0]
      ? formatDate(completeAt[0], DATE_FILTER_FORMAT)
      : undefined,
    completeAtTo: completeAt?.[1]
      ? formatDate(completeAt[1], DATE_FILTER_FORMAT)
      : undefined,

    status,
    isOverdue,
    isAssigned,
    [searchField]: searchValue || undefined,
    workGroupId: workGroupId ? parseInt(workGroupId) : undefined,
  }
}
