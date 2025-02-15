import { SortOrder } from 'antd/es/table/interface'

import { GetTasksSortValue } from 'features/tasks/api/schemas'

import { SortOrderEnum } from 'shared/constants/sort'

import { SortableField, sortableFieldToSortValues } from '../constants/sort'

export const getSort = (field: SortableField, order: SortOrder): GetTasksSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}
