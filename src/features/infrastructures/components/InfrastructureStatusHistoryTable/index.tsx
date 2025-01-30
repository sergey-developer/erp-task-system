import { Flex } from 'antd'
import { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import {
  InfrastructureStatusHistoryTableItem,
  InfrastructureStatusHistoryTableProps,
} from './types'

const InfrastructureStatusHistoryTable: FC<InfrastructureStatusHistoryTableProps> = (props) => {
  return (
    <Flex data-testid='infrastructure-status-history-table'>
      <ParentSizedTable<InfrastructureStatusHistoryTableItem>
        {...props}
        rowKey='id'
        columns={columns}
        showSorterTooltip={false}
      />
    </Flex>
  )
}

export default InfrastructureStatusHistoryTable
