import { Table, TableProps } from 'antd'
import React, { FC } from 'react'

import { columns } from './columns'
import { EquipmentByFileTableRow, EquipmentsByFileTableProps } from './types'

const scrollConfig: TableProps<EquipmentByFileTableRow>['scroll'] = { y: 280 }

const EquipmentsByFileTable: FC<EquipmentsByFileTableProps> = (props) => {
  return (
    <Table<EquipmentByFileTableRow>
      {...props}
      data-testid='equipments-by-file-table'
      rowKey='rowId'
      columns={columns}
      scroll={scrollConfig}
      components={{
        body: {
          row: (props: any) => {
            return <tr {...props} />
          },
        },
      }}
      pagination={false}
    />
  )
}

export default EquipmentsByFileTable
