import { SortOrder } from 'antd/es/table/interface'

import { GetTaskListSortValue } from 'modules/task/models'

import { SortOrderEnum } from 'shared/constants/sort'

import { SortableField, sortableFieldToSortValues } from '../constants/sort'

export const getSort = (field: SortableField, order: SortOrder): GetTaskListSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}
