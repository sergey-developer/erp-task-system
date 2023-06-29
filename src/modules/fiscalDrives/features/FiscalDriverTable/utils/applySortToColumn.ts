import { ColumnsType } from 'antd/es/table'

import { ArrayItem } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import { SortKey } from '../constants/sort'
import { parseSort } from './parseSort'

export const applySortToColumn = (
  column: ArrayItem<ColumnsType<any>>,
  sort: SortKey,
): ArrayItem<ColumnsType<any>> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}
