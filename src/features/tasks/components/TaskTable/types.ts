import { TableProps } from 'antd'

import { TableSortProps } from 'shared/types/sort'

import { TaskDTO } from 'features/tasks/api/dto'
import { GetTasksSortValue } from 'features/tasks/api/schemas'

export type TaskTableItem = Pick<
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
      TaskTableItem,
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
  Pick<TableProps<TaskTableItem>, 'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'>
> &
  TableSortProps<GetTasksSortValue>
