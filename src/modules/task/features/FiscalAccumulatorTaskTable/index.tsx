import React, { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { components } from './components'
import { columns } from './constants'
import {
  FiscalAccumulatorTaskTableItem,
  FiscalAccumulatorTaskTableProps,
} from './interfaces'
import { applySortToColumn } from './utils'

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
    <ParentSizedTable<FiscalAccumulatorTaskTableItem>
      data-testid='fiscal-accumulator-task-table'
      rowKey='id'
      dataSource={dataSource}
      components={components}
      columns={sortedColumns}
      loading={loading}
      onChange={onChange}
      showSorterTooltip={false}
      pagination={false}
    />
  )
}

export default FiscalAccumulatorTaskTable
