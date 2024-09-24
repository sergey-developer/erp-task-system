import { Flex } from 'antd'
import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { applySort } from './sort'
import { RelocationTaskTableItem, RelocationTaskTableProps } from './types'

const RelocationTaskTable: FC<RelocationTaskTableProps> = ({ sort, ...props }) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySort(col, sort) : col)),
    [sort],
  )

  return (
    <Flex data-testid='relocation-task-table'>
      <ParentSizedTable<RelocationTaskTableItem>
        {...props}
        rowKey='id'
        columns={sortedColumns}
        showSorterTooltip={false}
      />
    </Flex>
  )
}

export default RelocationTaskTable
