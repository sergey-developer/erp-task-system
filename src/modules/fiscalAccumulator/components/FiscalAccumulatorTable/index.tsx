import React, { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { components } from './components'
import { FiscalAccumulatorTableItem, FiscalAccumulatorTableProps } from './types'

const getRowKey = (
  record: FiscalAccumulatorTableItem,
): FiscalAccumulatorTableItem['olaNextBreachTime'] => record.olaNextBreachTime

const FiscalAccumulatorTable: FC<FiscalAccumulatorTableProps> = ({ dataSource = [], loading }) => {
  return (
    <div data-testid='fiscal-accumulator-table'>
      <ParentSizedTable<FiscalAccumulatorTableItem>
        rowKey={getRowKey}
        dataSource={dataSource}
        components={components}
        columns={columns}
        loading={loading}
      />
    </div>
  )
}

export default FiscalAccumulatorTable
