import { TableProps } from 'antd/es/table/Table'

import { SortEnum } from 'modules/task/features/TaskList/constants/enums'
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
  | 'reclassificationRequest'
>

export type TaskTableProps = Pick<
  TableProps<TaskTableListItem>,
  'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
> & {
  sorting?: SortEnum
}
