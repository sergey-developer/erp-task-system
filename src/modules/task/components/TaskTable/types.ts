import { TableProps } from 'antd'

import { GetTaskListSortValue, TaskListItemModel } from 'modules/task/models'
import { UserRoleEnum } from 'modules/user/constants'

export type TaskTableListItem = Pick<
  TaskListItemModel,
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
    'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow' | 'rowClassName'
  >
> & {
  sort?: GetTaskListSortValue
  userRole: UserRoleEnum
}
