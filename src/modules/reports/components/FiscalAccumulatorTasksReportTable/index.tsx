import { Table } from 'antd'
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
    <Table<FiscalAccumulatorTasksReportTableItem>
      data-testid='fiscal-accumulator-tasks-report-table'
      rowKey={getRowKey}
      dataSource={dataSource}
      components={components}
      columns={columns}
      loading={loading}
      onRow={onRow}
    />
  )
}

export default FiscalAccumulatorTasksReportTable
