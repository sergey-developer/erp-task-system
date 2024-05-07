import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { FC, useMemo } from 'react'

import { InventorizationEquipmentTableItem, ReviseEquipmentTableProps } from './types'

const columns: ProColumns<InventorizationEquipmentTableItem>[] = [
  {
    key: 'title',
    dataIndex: 'equipment',
    title: 'Наименование',
    fieldProps: { disabled: true },
    renderText: (dom, entity) => entity.equipment.title,
  },
  {
    key: 'serialNumber',
    dataIndex: 'equipment',
    title: 'Серийный номер',
    fieldProps: { disabled: true },
    renderText: (dom, entity) => entity.equipment.serialNumber,
  },
  {
    key: 'inventoryNumber',
    dataIndex: 'equipment',
    title: 'Инвентарный номер',
    fieldProps: { disabled: true },
    renderText: (dom, entity) => entity.equipment.inventoryNumber,
  },
  {
    key: 'locationPlan',
    dataIndex: 'locationPlan',
    title: 'Плановое местонахождение',
    fieldProps: { disabled: true },
    renderText: (dom, entity) => entity.locationPlan.title,
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество',
    valueType: 'digit',
    fieldProps: { disabled: true },
    renderText: (dom, entity) => entity.quantity.plan,
  },
]

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
