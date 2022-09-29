import { SortOrder } from 'antd/es/table/interface'

import {
  SortValue,
  SortableFieldKey,
  sortableFieldToSortValues,
} from '../constants/sort'

const getSort = (fieldKey: SortableFieldKey, order: SortOrder): SortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[fieldKey]
  return order === 'descend' ? descendValue : ascendValue
}

export default getSort
