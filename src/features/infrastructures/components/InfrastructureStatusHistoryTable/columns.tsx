import { ColumnsType } from 'antd/es/table'

import { infrastructureStatusDict } from 'features/infrastructures/constants'
import { getFullUserName } from 'features/user/utils'

import { formatDate } from 'shared/utils/date'

import { InfrastructureStatusHistoryTableItem } from './types'

export const columns: ColumnsType<InfrastructureStatusHistoryTableItem> = [
  {
    dataIndex: 'status',
    title: 'Статус',
    render: (value: InfrastructureStatusHistoryTableItem['status']) =>
      infrastructureStatusDict[value],
  },
  {
    dataIndex: 'createdAt',
    title: 'Изменен',
    render: (value: InfrastructureStatusHistoryTableItem['createdAt']) => formatDate(value),
  },
  {
    dataIndex: 'createdBy',
    title: 'Кем изменен',
    render: (value: InfrastructureStatusHistoryTableItem['createdBy']) => getFullUserName(value),
  },
]
