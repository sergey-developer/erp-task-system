import { ProColumns } from '@ant-design/pro-components'

import { ReviseEquipmentTableItem } from './types'

export const columns: ProColumns<ReviseEquipmentTableItem>[] = [
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
    renderText: (dom, entity) => entity.locationPlan?.title,
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
