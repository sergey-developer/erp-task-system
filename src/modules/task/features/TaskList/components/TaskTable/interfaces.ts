import { TableProps } from 'antd/es/table/Table'

import { SortEnum } from 'modules/task/features/TaskList/constants/common'
import { TaskListItemModel } from 'modules/task/features/TaskList/models'

export type TaskTableListItem = Pick<
  TaskListItemModel,
  | 'id'
  | 'recordId'
  | 'name'
  | 'title'
  | 'assignee'
  | 'workGroup'
  | 'olaNextBreachTime'
  | 'olaStatus'
  | 'comment'
  | 'createdAt'
  | 'status'
  | 'extendedStatus'
>

export type TaskTableProps = Pick<
  TableProps<TaskTableListItem>,
  | 'dataSource'
  | 'loading'
  | 'onChange'
  | 'pagination'
  | 'onRow'
  | 'rowClassName'
> & {
  sorting?: SortEnum
}
