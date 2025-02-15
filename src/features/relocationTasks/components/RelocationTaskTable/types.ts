import { TableProps } from 'antd'
import { RelocationTaskDTO } from 'features/relocationTasks/api/dto'
import { GetRelocationTasksSortValue } from 'features/relocationTasks/api/schemas'

import { TableSortProps } from 'shared/types/sort'

export type RelocationTaskTableItem = Pick<
  RelocationTaskDTO,
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
