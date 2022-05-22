import { TableProps } from 'antd/lib/table/Table'

import { SmartSortEnum, Task } from 'modules/tasks/models'

export type TaskTableProps = Pick<
  TableProps<Task>,
  'dataSource' | 'loading' | 'onChange' | 'pagination'
> & {
  sorting?: SmartSortEnum
}
