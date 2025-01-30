import { Flex, Table } from 'antd'
import { FC, useMemo } from 'react'

import { columns } from './columns'
import { applySort } from './sort'
import { MtsrReportTableItem, MtsrReportTableProps } from './types'

const MtsrReportTable: FC<MtsrReportTableProps> = ({
  sort,
  onSelect,
  selectedRowKeys,
  ...props
}) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySort(col, sort) : col)),
    [sort],
  )

  return (
    <Flex data-testid='mtsr-report-table'>
      <Table<MtsrReportTableItem>
        {...props}
        rowKey='id'
        columns={sortedColumns}
        showSorterTooltip={false}
        pagination={false}
        rowSelection={{ type: 'checkbox', onChange: onSelect, selectedRowKeys }}
      />
    </Flex>
  )
}

export default MtsrReportTable
