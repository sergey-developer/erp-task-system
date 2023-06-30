import React, { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import {
  FiscalAccumulatorTaskTableItem,
  FiscalAccumulatorTaskTableProps,
} from './interfaces'
import { TableWrapperStyled } from './styles'
import { applySortToColumn, columns } from './utils'

const FiscalAccumulatorTaskTable: FC<FiscalAccumulatorTaskTableProps> = ({
  dataSource,
  loading,
  sort,
  onChange,
}) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySortToColumn(col, sort) : col)),
    [sort],
  )

  return (
    <TableWrapperStyled data-testid='fiscal-accumulator-task-table'>
      <ParentSizedTable<FiscalAccumulatorTaskTableItem>
        rowKey='id'
        dataSource={dataSource}
        columns={sortedColumns}
        loading={loading}
        onChange={onChange}
        showSorterTooltip={false}
      />
    </TableWrapperStyled>
  )
}

export default FiscalAccumulatorTaskTable
