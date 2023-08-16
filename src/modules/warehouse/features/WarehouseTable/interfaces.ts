import { TableProps } from 'antd'

import {
  GetWarehouseListSortValue,
  WarehouseListItemModel,
} from 'modules/warehouse/models'

export type WarehouseTableItem = WarehouseListItemModel

export type WarehouseTableProps = Required<
  Pick<TableProps<WarehouseTableItem>, 'dataSource' | 'loading' | 'onChange'>
> & {
  sort?: GetWarehouseListSortValue
}
