import { TableProps } from 'antd/lib/table/Table'
import { SortEnum } from 'modules/task/components/TaskList/constants/enums'
import { TaskListItemModel } from 'modules/task/components/TaskList/models'

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
>

export type TaskTableProps = Pick<
  TableProps<TaskTableListItem>,
  'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
> & {
  sorting?: SortEnum
}
