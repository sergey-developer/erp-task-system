import { TableProps } from 'antd/lib/table/Table'

import { Task } from 'modules/tasks/taskList/models'

import { ColumnsTypeContentEnum } from './constants'

export type TaskTableProps = Pick<
  TableProps<Task>,
  'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
> & {
  columns: ColumnsTypeContentEnum
}
