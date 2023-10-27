import { ColumnsType } from 'antd/es/table'

import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'

import { valueOrHyphen } from 'shared/utils/common'

import { RelocationEquipmentTableItem } from './types'

export const columns: ColumnsType<RelocationEquipmentTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Оборудование',
  },
  {
    key: 'serialNumber',
    dataIndex: 'serialNumber',
    title: 'Серийный номер',
    render: (value: RelocationEquipmentTableItem['serialNumber']) => valueOrHyphen(value),
  },
  {
    key: 'purpose',
    dataIndex: 'purpose',
    title: 'Назначение',
  },
  {
    key: 'condition',
    dataIndex: 'condition',
    title: 'Состояние',
    render: (value: RelocationEquipmentTableItem['condition']) => equipmentConditionDict[value],
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество',
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'Стоимость',
    render: (value: RelocationEquipmentTableItem['price']) => valueOrHyphen(value),
  },
  {
    key: 'currency',
    dataIndex: 'currency',
    title: 'Валюта',
    render: (value: RelocationEquipmentTableItem['currency']) => valueOrHyphen(value?.title),
  },
]
