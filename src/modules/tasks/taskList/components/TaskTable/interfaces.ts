import { TableProps } from 'antd/lib/table/Table'
import { SortEnum } from 'modules/tasks/constants/enums'
import { TaskListItemModel } from 'modules/tasks/taskList/models'

export type TaskTableProps = Pick<
  TableProps<TaskListItemModel>,
  'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
> & {
  sorting?: SortEnum
}
