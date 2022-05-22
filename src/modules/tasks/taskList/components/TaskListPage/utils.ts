import {
  ExtendedFilterFormFields,
  ExtendedFilterQueries,
} from '../../../models'
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
  const { creationDateRange, smartSearchField, smartSearchValue, status } =
    fields

  return {
    dateFrom: creationDateRange
      ? creationDateRange[0].format(DATE_FILTER_FORMAT)
      : undefined,
    dateTo: creationDateRange
      ? creationDateRange[1].format(DATE_FILTER_FORMAT)
      : undefined,
    status,
    [smartSearchField]: smartSearchValue,
  }
}
