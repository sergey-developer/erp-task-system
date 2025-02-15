import { TableProps } from 'antd'
import { TaskCompletionDocumentDTO } from 'features/tasks/api/dto'

import { IdType } from 'shared/types/common'
import { ArrayFirst } from 'shared/types/utils'

export type TaskCompletedWorkTableItem = Pick<
  ArrayFirst<NonNullable<TaskCompletionDocumentDTO['workList']>>,
  'id' | 'title' | 'measurementUnit' | 'quantity'
>

export type TaskCompletedWorkTableProps = Required<
  Pick<TableProps<TaskCompletedWorkTableItem>, 'dataSource' | 'loading'>
> & {
  disabled: boolean
  onDelete: (id: IdType) => Promise<void>
}
