import { ColumnsType } from 'antd/es/table'

import { equipmentConditionDict } from 'modules/warehouse/constants'

import { valueOrHyphen } from 'shared/utils/common'

import { EquipmentTableItem } from './types'

export const columns: ColumnsType<EquipmentTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Наименование',
    sorter: true,
    render: (value: EquipmentTableItem['title']) => value,
  },
  {
    key: 'serialNumber',
    dataIndex: 'serialNumber',
    title: 'Серийный номер',
    sorter: true,
    render: (value: EquipmentTableItem['serialNumber']) => valueOrHyphen(value),
  },
  {
    key: 'inventoryNumber',
    dataIndex: 'inventoryNumber',
    title: 'Инвентарный номер',
    sorter: true,
    render: (value: EquipmentTableItem['inventoryNumber']) =>
      valueOrHyphen(value),
  },
  {
    key: 'warehouse',
    dataIndex: 'warehouse',
    title: 'Склад',
    sorter: true,
    render: (value: EquipmentTableItem['warehouse']) =>
      valueOrHyphen(value?.title),
  },
  {
    key: 'condition',
    dataIndex: 'condition',
    title: 'Состояние',
    sorter: true,
    render: (value: EquipmentTableItem['condition']) =>
      equipmentConditionDict[value],
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество',
    sorter: true,
    render: (value: EquipmentTableItem['quantity']) => value,
  },
  {
    key: 'category',
    dataIndex: 'category',
    title: 'Категория',
    sorter: true,
    render: (value: EquipmentTableItem['category']) => value.title,
  },
  {
    key: 'purpose',
    dataIndex: 'purpose',
    title: 'Назначение',
    sorter: true,
    render: (value: EquipmentTableItem['purpose']) => value.title,
  },
]
