import { Table, TableProps } from 'antd'
import React, { FC } from 'react'

import { columns } from './columns'
import { EquipmentByFileTemplateTableRow, EquipmentsByFileTemplateTableProps } from './types'

const scrollConfig: TableProps<EquipmentByFileTemplateTableRow>['scroll'] = { y: 280 }

const EquipmentsByFileTemplateTable: FC<EquipmentsByFileTemplateTableProps> = (props) => {
  return (
    <Table<EquipmentByFileTemplateTableRow>
      {...props}
      data-testid='equipments-by-file-template-table'
      rowKey='id'
      columns={columns}
      scroll={scrollConfig}
    />
  )
}

export default EquipmentsByFileTemplateTable
