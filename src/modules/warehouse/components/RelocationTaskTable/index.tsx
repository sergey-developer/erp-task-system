import { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { RelocationTaskTableProps, RelocationTaskTableItem } from './types'

const RelocationTaskTable: FC<RelocationTaskTableProps> = (props) => {
  return (
    <div data-testid='relocation-task-table'>
      <ParentSizedTable<RelocationTaskTableItem> {...props} rowKey='id' columns={columns} />
    </div>
  )
}

export default RelocationTaskTable
