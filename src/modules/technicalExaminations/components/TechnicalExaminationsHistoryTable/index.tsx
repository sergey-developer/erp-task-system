import { Flex, Table } from 'antd'
import { FC } from 'react'

import { columns } from './columns'
import {
  TechnicalExaminationsHistoryTableItem,
  TechnicalExaminationsHistoryTableProps,
} from './types'

const TechnicalExaminationsHistoryTable: FC<TechnicalExaminationsHistoryTableProps> = (props) => {
  return (
    <Flex data-testid='technical-examinations-history-table'>
      <Table<TechnicalExaminationsHistoryTableItem>
        {...props}
        virtual
        rowKey='id'
        columns={columns}
        pagination={false}
      />
    </Flex>
  )
}

export default TechnicalExaminationsHistoryTable
