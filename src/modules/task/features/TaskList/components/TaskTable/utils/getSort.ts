import { SortOrder } from 'antd/es/table/interface'

import { SortOrderEnum } from 'shared/constants/sort'

import {
  SortValue,
  SortableFieldKey,
  sortableFieldToSortValues,
} from '../constants/sort'

const getSort = (fieldKey: SortableFieldKey, order: SortOrder): SortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[fieldKey]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

export default getSort
