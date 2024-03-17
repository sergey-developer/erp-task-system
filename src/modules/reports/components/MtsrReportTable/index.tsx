import { Table } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'
import { FC, useMemo } from 'react'

import { columns } from './columns'
import { applySort } from './sort'
import { MtsrReportTableItem, MtsrReportTableProps } from './types'

const MtsrReportTable: FC<MtsrReportTableProps> = ({ sort, onSelect, ...props }) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySort(col, sort) : col)),
    [sort],
  )

  const rowSelection = useMemo<TableRowSelection<MtsrReportTableItem>>(
    () => ({ type: 'checkbox', onChange: onSelect }),
    [onSelect],
  )

  return (
    <div data-testid='mtsr-report-table'>
      <Table<MtsrReportTableItem>
        {...props}
        rowKey='id'
        columns={sortedColumns}
        showSorterTooltip={false}
        pagination={false}
        rowSelection={rowSelection}
      />
    </div>
  )
}

export default MtsrReportTable
