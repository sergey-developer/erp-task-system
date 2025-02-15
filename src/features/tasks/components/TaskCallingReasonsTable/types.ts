import { TableProps } from 'antd'
import { TaskCompletionDocumentDTO } from 'features/tasks/api/dto'

import { IdType } from 'shared/types/common'
import { ArrayFirst } from 'shared/types/utils'

export type TaskCallingReasonsTableItem = Pick<
  ArrayFirst<NonNullable<TaskCompletionDocumentDTO['initiationReasons']>>,
  'id' | 'title' | 'equipmentType' | 'malfunction' | 'inventoryNumber'
>

export type TaskCallingReasonsTableProps = Required<
  Pick<TableProps<TaskCallingReasonsTableItem>, 'dataSource' | 'loading'>
> & {
  disabled: boolean
  onDelete: (id: IdType) => Promise<void>
}
