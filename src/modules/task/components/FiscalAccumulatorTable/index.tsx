import React, { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { TableWrapperStyled } from '../TaskTable/styles'
import { columns } from './columns'
import { components } from './components'
import { FiscalAccumulatorTableItem, FiscalAccumulatorTableProps } from './types'

const getRowKey = (
  record: FiscalAccumulatorTableItem,
): FiscalAccumulatorTableItem['olaNextBreachTime'] => record.olaNextBreachTime

const FiscalAccumulatorTable: FC<FiscalAccumulatorTableProps> = ({ dataSource, loading }) => {
  return (
    <TableWrapperStyled data-testid='fiscal-accumulator-table'>
      <ParentSizedTable<FiscalAccumulatorTableItem>
        rowKey={getRowKey}
        dataSource={dataSource}
        components={components}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </TableWrapperStyled>
  )
}

export default FiscalAccumulatorTable
