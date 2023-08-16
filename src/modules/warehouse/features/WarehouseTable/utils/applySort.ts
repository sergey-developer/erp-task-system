import { ColumnsType } from 'antd/es/table'
import isEqual from 'lodash/isEqual'

import { GetWarehouseListSortValue } from 'modules/warehouse/models'

import { ArrayFirst } from 'shared/types/utils'

import { WarehouseTableItem } from '../interfaces'
import { parseSort } from './parseSort'

export const applySort = (
  column: ArrayFirst<ColumnsType<WarehouseTableItem>>,
  sort: GetWarehouseListSortValue,
): ArrayFirst<ColumnsType<WarehouseTableItem>> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}
