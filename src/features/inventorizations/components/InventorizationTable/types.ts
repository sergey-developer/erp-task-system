import { TableProps } from 'antd'
import { GetInventorizationsSortValue, InventorizationDTO } from 'features/warehouse/models'

import { TableSortProps } from 'shared/types/sort'

export type InventorizationTableItem = Pick<
  InventorizationDTO,
  'id' | 'type' | 'warehouses' | 'deadlineAt' | 'executor' | 'status' | 'createdBy' | 'createdAt'
>

export type InventorizationTableProps = Required<
  Pick<
    TableProps<InventorizationTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
  >
> &
  TableSortProps<GetInventorizationsSortValue>
