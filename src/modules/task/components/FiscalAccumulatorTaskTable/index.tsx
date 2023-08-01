import React, { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { TableWrapperStyled } from '../TaskTable/styles'
import { columns } from './columns'
import { components } from './components'
import {
  FiscalAccumulatorTaskTableItem,
  FiscalAccumulatorTaskTableProps,
} from './types'

const getRowKey = (
  record: FiscalAccumulatorTaskTableItem,
): FiscalAccumulatorTaskTableItem['olaNextBreachTime'] =>
  record.olaNextBreachTime

const FiscalAccumulatorTaskTable: FC<FiscalAccumulatorTaskTableProps> = ({
  dataSource,
  loading,
}) => {
  return (
    <TableWrapperStyled data-testid='fiscal-accumulator-task-table'>
      <ParentSizedTable<FiscalAccumulatorTaskTableItem>
        rowKey={getRowKey}
        dataSource={dataSource}
        components={components}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
        pagination={false}
      />
    </TableWrapperStyled>
  )
}

export default FiscalAccumulatorTaskTable
