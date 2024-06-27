import { TableProps } from 'antd'

import { GetRelocationTasksSortValue, RelocationTaskListItemModel } from 'modules/warehouse/models'

import { TableSortProps } from 'shared/types/sort'

export type RelocationTaskTableItem = Pick<
  RelocationTaskListItemModel,
  | 'id'
  | 'type'
  | 'deadlineAt'
  | 'relocateFrom'
  | 'relocateTo'
  | 'executors'
  | 'controller'
  | 'status'
  | 'completedBy'
  | 'createdBy'
  | 'createdAt'
>

export type RelocationTaskTableProps = Required<
  Pick<
    TableProps<RelocationTaskTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
  >
> &
  TableSortProps<GetRelocationTasksSortValue>
