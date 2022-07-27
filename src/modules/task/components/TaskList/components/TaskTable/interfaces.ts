import { TableProps } from 'antd/lib/table/Table'
import { TaskListItemModel } from 'modules/task/components/TaskList/models'
import { SortEnum } from 'modules/task/constants/enums'

export type TaskTableProps = Pick<
  TableProps<TaskListItemModel>,
  'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
> & {
  sorting?: SortEnum
}
