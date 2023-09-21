import { ColumnsType } from 'antd/es/table'

import { valueOrHyphen } from 'shared/utils/common'

import { RelocationEquipmentTableItem } from './types'

export const columns: ColumnsType<RelocationEquipmentTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Оборудование',
    render: (value: RelocationEquipmentTableItem['title']) => value,
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
    render: (value: RelocationEquipmentTableItem['purpose']) => value,
  },
  {
    key: 'condition',
    dataIndex: 'condition',
    title: 'Состояние',
    render: (value: RelocationEquipmentTableItem['condition']) => value,
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество',
    render: (value: RelocationEquipmentTableItem['quantity']) => value,
  },
]
