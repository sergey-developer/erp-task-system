import { TableProps } from 'antd'

import {
  GetInventorizationsSortValue,
  InventorizationListItemModel,
} from 'modules/warehouse/models'

import { TableSortProps } from 'shared/types/sort'

export type InventorizationTableItem = Pick<
  InventorizationListItemModel,
  'id' | 'type' | 'warehouses' | 'deadlineAt' | 'executor' | 'status' | 'createdBy' | 'createdAt'
>

export type InventorizationTableProps = Required<
  Pick<TableProps<InventorizationTableItem>, 'dataSource' | 'loading' | 'onChange' | 'pagination'>
> &
  TableSortProps<GetInventorizationsSortValue>
