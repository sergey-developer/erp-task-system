import { SortOrder } from 'antd/es/table/interface'

import { SortOrderEnum } from 'shared/constants/sort'

import {
  SortKey,
  SortableField,
  sortableFieldToSortValues,
} from '../constants/sort'

export const getSort = (field: SortableField, order: SortOrder): SortKey => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}
