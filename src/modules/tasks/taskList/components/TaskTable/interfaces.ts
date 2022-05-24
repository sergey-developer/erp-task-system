import { TableProps } from 'antd/lib/table/Table'

import { SortEnum, Task } from 'modules/tasks/models'

export type TaskTableProps = Pick<
  TableProps<Task>,
  'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
> & {
  sorting?: SortEnum
}
