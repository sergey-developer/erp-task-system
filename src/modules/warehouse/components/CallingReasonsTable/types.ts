import { TableProps } from 'antd'

import { TaskCompletionDocumentModel } from 'modules/task/models'

import { IdType } from 'shared/types/common'
import { ArrayFirst } from 'shared/types/utils'

export type CallingReasonsTableItem = Pick<
  ArrayFirst<NonNullable<TaskCompletionDocumentModel['initiationReasons']>>,
  'id' | 'title' | 'equipmentType' | 'malfunction' | 'inventoryNumber'
>

export type CallingReasonsTableProps = Required<
  Pick<TableProps<CallingReasonsTableItem>, 'dataSource' | 'loading'>
> & {
  onDelete: (id: IdType) => Promise<void>
}
