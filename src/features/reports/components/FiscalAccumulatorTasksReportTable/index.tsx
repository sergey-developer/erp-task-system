import { Flex, Table } from 'antd'
import React, { FC } from 'react'

import { columns } from './columns'
import { components } from './components'
import {
  FiscalAccumulatorTasksReportTableItem,
  FiscalAccumulatorTasksReportTableProps,
} from './types'

const getRowKey = (
  record: FiscalAccumulatorTasksReportTableItem,
): FiscalAccumulatorTasksReportTableItem['olaNextBreachTime'] => record.olaNextBreachTime

const FiscalAccumulatorTasksReportTable: FC<FiscalAccumulatorTasksReportTableProps> = ({
  dataSource = [],
  loading,
  onRow,
}) => {
  return (
    <Flex data-testid='fiscal-accumulator-tasks-report-table'>
      <Table<FiscalAccumulatorTasksReportTableItem>
        rowKey={getRowKey}
        dataSource={dataSource}
        components={components}
        columns={columns}
        loading={loading}
        onRow={onRow}
      />
    </Flex>
  )
}

export default FiscalAccumulatorTasksReportTable
