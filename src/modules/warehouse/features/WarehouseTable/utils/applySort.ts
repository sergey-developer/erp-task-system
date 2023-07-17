import { ColumnsType } from 'antd/es/table'

import { GetWarehouseListSortValue } from 'modules/warehouse/models'

import { ArrayItem } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import { WarehouseTableItem } from '../interfaces'
import { parseSort } from './parseSort'

export const applySort = (
  column: ArrayItem<ColumnsType<WarehouseTableItem>>,
  sort: GetWarehouseListSortValue,
): ArrayItem<ColumnsType<WarehouseTableItem>> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}
