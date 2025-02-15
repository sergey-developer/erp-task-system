import { TableProps } from 'antd'
import { GetTasksSortValue, TaskDTO } from 'features/tasks/api/dto'

import { TableSortProps } from 'shared/types/sort'

export type TaskTableListItem = Pick<
  TaskDTO,
  | 'id'
  | 'recordId'
  | 'name'
  | 'title'
  | 'assignee'
  | 'lastComment'
  | 'workGroup'
  | 'supportGroup'
  | 'olaNextBreachTime'
  | 'olaStatus'
  | 'createdAt'
  | 'status'
  | 'extendedStatus'
  | 'subtasksCounter'
  | 'responseTime'
> & {
  isBoundary?: boolean
}

export type TaskTableColumnKey =
  | 'noop'
  | keyof Pick<
      TaskTableListItem,
      | 'id'
      | 'recordId'
      | 'name'
      | 'title'
      | 'assignee'
      | 'workGroup'
      | 'supportGroup'
      | 'olaNextBreachTime'
      | 'status'
      | 'subtasksCounter'
      | 'lastComment'
      | 'createdAt'
      | 'responseTime'
    >

export type TaskTableProps = Required<
  Pick<
    TableProps<TaskTableListItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
  >
> &
  TableSortProps<GetTasksSortValue>
