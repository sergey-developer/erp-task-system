import { TableProps } from 'antd/lib/table/Table'

import { Task } from 'modules/tasks/taskList/models'

export type TaskTableProps = Pick<
  TableProps<Task>,
  'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
> & {
  sorting?: SmartSortEnum
}
