import { TableProps } from 'antd'

import { TaskCompletionDocumentModel } from 'modules/task/models'

import { IdType } from 'shared/types/common'
import { ArrayFirst } from 'shared/types/utils'

export type CompletedWorkTableItem = Pick<
  ArrayFirst<NonNullable<TaskCompletionDocumentModel['workList']>>,
  'id' | 'title' | 'measurementUnit' | 'quantity'
>

export type CompletedWorkTableProps = Required<
  Pick<TableProps<CompletedWorkTableItem>, 'dataSource' | 'loading'>
> & {
  onDelete: (id: IdType) => Promise<void>
}
