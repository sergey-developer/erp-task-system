import { TableProps } from 'antd/es/table/Table'

import { TaskListItemModel } from 'modules/task/models'
import { UserRoleEnum } from 'shared/constants/roles'

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
  | 'supportGroup'
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
      | 'supportGroup'
      | 'olaNextBreachTime'
      | 'status'
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
  userRole: UserRoleEnum
}
