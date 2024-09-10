import { TableProps } from 'antd'

import { GetRelocationTasksSortKey, RelocationTaskListItemModel } from 'modules/warehouse/models'

import { ExtendSortKey, TableSortProps } from 'shared/types/sort'
import { SetNonNullable } from 'shared/types/utils'

export type ExecuteInventorizationRelocationTaskTableItem = Pick<
  RelocationTaskListItemModel,
  'id' | 'type' | 'relocateFrom' | 'relocateTo' | 'status'
>

export type ExecuteInventorizationRelocationTaskTableSortKey = Extract<
  GetRelocationTasksSortKey,
  | 'type'
  | '-type'
  | 'relocate_from'
  | '-relocate_from'
  | 'relocate_to'
  | '-relocate_to'
  | 'status'
  | '-status'
>

export type ExecuteInventorizationRelocationTaskTableSortValue =
  ExtendSortKey<ExecuteInventorizationRelocationTaskTableSortKey>

export type ExecuteInventorizationRelocationTaskTableProps = SetNonNullable<
  Pick<
    TableProps<ExecuteInventorizationRelocationTaskTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
  >
> &
  TableSortProps<ExecuteInventorizationRelocationTaskTableSortValue>
