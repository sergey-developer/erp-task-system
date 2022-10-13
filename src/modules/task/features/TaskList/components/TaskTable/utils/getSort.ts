import { SortOrder } from 'antd/es/table/interface'

import { SortOrderEnum } from 'shared/constants/sort'

import {
  SortValue,
  SortableField,
  sortableFieldToSortValues,
} from '../constants/sort'

const getSort = (field: SortableField, order: SortOrder): SortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

export default getSort
