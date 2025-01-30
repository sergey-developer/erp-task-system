import { TableProps } from 'antd'

import { GetWarehouseListSortValue, WarehouseListItemModel } from 'features/warehouse/models'

import { TableSortProps } from 'shared/types/sort'
import { SetNonNullable } from 'shared/types/utils'

export type WarehouseTableItem = WarehouseListItemModel

export type WarehouseTableProps = SetNonNullable<
  Pick<TableProps<WarehouseTableItem>, 'dataSource' | 'loading' | 'onChange'>
> &
  TableSortProps<GetWarehouseListSortValue>
