import { EditableProTable } from '@ant-design/pro-components'
import { FC, useMemo } from 'react'

import { columns } from './columns'
import { InventorizationEquipmentTableItem, ReviseEquipmentTableProps } from './types'

const ReviseEquipmentTable: FC<ReviseEquipmentTableProps> = ({ dataSource, ...props }) => {
  const editableKeys = useMemo(() => dataSource.map((item) => item.id), [dataSource])

  return (
    <EditableProTable<InventorizationEquipmentTableItem>
      data-testid='revise-equipment-table'
      rowKey='id'
      columns={columns}
      ghost
      value={dataSource}
      recordCreatorProps={false}
      editable={{ type: 'multiple', editableKeys }}
      {...props}
    />
  )
}

export default ReviseEquipmentTable
