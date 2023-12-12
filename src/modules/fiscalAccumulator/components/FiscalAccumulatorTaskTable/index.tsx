import { Table } from 'antd'
import React, { FC } from 'react'

import { columns } from './columns'
import { components } from './components'
import { FiscalAccumulatorTaskTableItem, FiscalAccumulatorTaskTableProps } from './types'

const getRowKey = (
  record: FiscalAccumulatorTaskTableItem,
): FiscalAccumulatorTaskTableItem['olaNextBreachTime'] => record.olaNextBreachTime

const FiscalAccumulatorTaskTable: FC<FiscalAccumulatorTaskTableProps> = ({
  dataSource = [],
  loading,
  onRow,
}) => {
  return (
    <Table<FiscalAccumulatorTaskTableItem>
      data-testid='fiscal-accumulator-task-table'
      rowKey={getRowKey}
      dataSource={dataSource}
      components={components}
      columns={columns}
      loading={loading}
      onRow={onRow}
    />
  )
}

export default FiscalAccumulatorTaskTable
