import React, { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { components } from './components'
import {
  FiscalAccumulatorTaskTableItem,
  FiscalAccumulatorTaskTableProps,
} from './interfaces'

const getRowKey = (
  record: FiscalAccumulatorTaskTableItem,
): FiscalAccumulatorTaskTableItem['olaNextBreachTime'] =>
  record.olaNextBreachTime

const FiscalAccumulatorTaskTable: FC<FiscalAccumulatorTaskTableProps> = ({
  dataSource,
  loading,
}) => {
  return (
    <div data-testid='fiscal-accumulator-task-table'>
      <ParentSizedTable<FiscalAccumulatorTaskTableItem>
        rowKey={getRowKey}
        dataSource={dataSource}
        components={components}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
        pagination={false}
      />
    </div>
  )
}

export default FiscalAccumulatorTaskTable
