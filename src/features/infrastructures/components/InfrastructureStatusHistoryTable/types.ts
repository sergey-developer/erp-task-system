import { TableProps } from 'antd'

import { InfrastructureStatusHistoryItemModel } from 'features/infrastructures/models'

import { SetNonNullable } from 'shared/types/utils'

export type InfrastructureStatusHistoryTableItem = Pick<
  InfrastructureStatusHistoryItemModel,
  'id' | 'status' | 'createdAt' | 'createdBy'
>

export type InfrastructureStatusHistoryTableProps = SetNonNullable<
  Pick<TableProps<InfrastructureStatusHistoryTableItem>, 'dataSource' | 'loading'>
>
