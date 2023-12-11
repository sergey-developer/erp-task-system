import React, { FC } from 'react'

// todo: придумать как избавиться от этого компонента
import { TableWrapperStyled } from 'modules/task/components/TaskTable/styles'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

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
    <TableWrapperStyled data-testid='fiscal-accumulator-task-table'>
      <ParentSizedTable<FiscalAccumulatorTaskTableItem>
        rowKey={getRowKey}
        dataSource={dataSource}
        components={components}
        columns={columns}
        loading={loading}
        onRow={onRow}
      />
    </TableWrapperStyled>
  )
}

export default FiscalAccumulatorTaskTable
