import { ColumnsType } from 'antd/es/table'

import { equipmentConditionDict } from 'modules/warehouse/constants'

import { valueOrHyphen } from 'shared/utils/common'

import { EquipmentTableItem } from './types'

export const columns: ColumnsType<EquipmentTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Наименование',
    render: (value: EquipmentTableItem['title']) => value,
  },
  {
    key: 'serialNumber',
    dataIndex: 'serialNumber',
    title: 'Серийный номер',
    render: (value: EquipmentTableItem['serialNumber']) => valueOrHyphen(value),
  },
  {
    key: 'inventoryNumber',
    dataIndex: 'inventoryNumber',
    title: 'Инвентарный номер',
    render: (value: EquipmentTableItem['inventoryNumber']) =>
      valueOrHyphen(value),
  },
  {
    key: 'warehouse',
    dataIndex: 'warehouse',
    title: 'Склад',
    render: (value: EquipmentTableItem['warehouse']) =>
      valueOrHyphen(value?.title),
  },
  {
    key: 'condition',
    dataIndex: 'condition',
    title: 'Состояние',
    render: (value: EquipmentTableItem['condition']) =>
      equipmentConditionDict[value],
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество',
    render: (value: EquipmentTableItem['quantity']) => value,
  },
  {
    key: 'category',
    dataIndex: 'category',
    title: 'Категория',
    render: (value: EquipmentTableItem['category']) => value.title,
  },
  {
    key: 'purpose',
    dataIndex: 'purpose',
    title: 'Назначение',
    render: (value: EquipmentTableItem['purpose']) => value.title,
  },
]
