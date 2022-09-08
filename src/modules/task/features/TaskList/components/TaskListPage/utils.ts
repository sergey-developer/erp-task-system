import { DATE_FILTER_FORMAT } from './constants'
import { ExtendedFilterFormFields, ExtendedFilterQueries } from './interfaces'

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

  return {
    ...(olaNextBreachTimeRange && {
      dateFrom: olaNextBreachTimeRange[0].format(DATE_FILTER_FORMAT),
      dateTo: olaNextBreachTimeRange[1].format(DATE_FILTER_FORMAT),
    }),
    status,
    [searchField]: searchValue || undefined,
    workGroupId: workGroupId ? parseInt(workGroupId) : undefined,
  }
}
