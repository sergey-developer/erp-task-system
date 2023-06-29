import React, { FC, useMemo } from 'react'

import { FiscalDriverTableProps } from './interfaces'
import { TableStyled, TableWrapperStyled } from './styles'
import { applySortToColumn, columns } from './utils'

const FiscalDriverTable: FC<FiscalDriverTableProps> = ({
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
    <TableWrapperStyled data-testid='fiscal-drivers-table'>
      <TableStyled<any>
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

export default FiscalDriverTable
