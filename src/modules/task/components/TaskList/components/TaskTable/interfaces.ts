import { TableProps } from 'antd/lib/table/Table'
import { SortEnum } from 'modules/task/components/TaskList/constants/enums'
import { TaskListItemModel } from 'modules/task/components/TaskList/models'

export type TaskTableProps = Pick<
  TableProps<TaskListItemModel>,
  'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
> & {
  sorting?: SortEnum
}
