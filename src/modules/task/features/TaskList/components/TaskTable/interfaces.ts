import { TableProps } from 'antd/es/table/Table'

import { TaskListItemModel } from 'modules/task/features/TaskList/models'

import { SortValue } from './constants/sort'

export type TaskTableListItem = Pick<
  TaskListItemModel,
  | 'id'
  | 'recordId'
  | 'name'
  | 'title'
  | 'assignee'
  | 'lastComment'
  | 'workGroup'
  | 'olaNextBreachTime'
  | 'olaStatus'
  | 'createdAt'
  | 'status'
  | 'extendedStatus'
>

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
      | 'olaNextBreachTime'
      | 'lastComment'
      | 'createdAt'
    >

export type TaskTableProps = Required<
  Pick<
    TableProps<TaskTableListItem>,
    | 'dataSource'
    | 'loading'
    | 'onChange'
    | 'pagination'
    | 'onRow'
    | 'rowClassName'
  >
> & {
  sort?: SortValue
}
