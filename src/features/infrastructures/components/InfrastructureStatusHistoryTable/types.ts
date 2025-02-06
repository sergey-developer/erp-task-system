import { TableProps } from 'antd'
import { InfrastructureStatusHistoryItemDTO } from 'features/infrastructures/api/dto'

import { SetNonNullable } from 'shared/types/utils'

export type InfrastructureStatusHistoryTableItem = Pick<
  InfrastructureStatusHistoryItemDTO,
  'id' | 'status' | 'createdAt' | 'createdBy'
>

export type InfrastructureStatusHistoryTableProps = SetNonNullable<
  Pick<TableProps<InfrastructureStatusHistoryTableItem>, 'dataSource' | 'loading'>
>
