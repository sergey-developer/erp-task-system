import { TableProps } from 'antd'
import { WarehouseDTO } from 'features/warehouses/api/dto'
import { GetWarehousesSortValue } from 'features/warehouses/api/schemas'

import { TableSortProps } from 'shared/types/sort'
import { SetNonNullable } from 'shared/types/utils'

export type WarehouseTableItem = WarehouseDTO

export type WarehouseTableProps = SetNonNullable<
  Pick<TableProps<WarehouseTableItem>, 'dataSource' | 'loading' | 'onChange'>
> &
  TableSortProps<GetWarehousesSortValue>
