import { TableProps } from 'antd/lib/table/Table'

import { SmartSortEnum } from 'modules/tasks/constants'
import { Task } from 'modules/tasks/taskList/models'

export type TaskTableProps = Pick<
  TableProps<Task>,
  'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
> & {
  sorting?: SmartSortEnum
}
