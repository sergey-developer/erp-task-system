import { ColumnsType } from 'antd/es/table'
import { equipmentConditionDict } from 'features/equipments/constants'

import { getYesNoWord, valueOr } from 'shared/utils/common'

import { EquipmentTableItem } from './types'

export const columns: ColumnsType<EquipmentTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Наименование',
    sorter: true,
  },
  {
    key: 'serialNumber',
    dataIndex: 'serialNumber',
    title: 'Серийный номер',
    sorter: true,
    render: (value: EquipmentTableItem['serialNumber']) => valueOr(value),
  },
  {
    key: 'inventoryNumber',
    dataIndex: 'inventoryNumber',
    title: 'Инвентарный номер',
    sorter: true,
    render: (value: EquipmentTableItem['inventoryNumber']) => valueOr(value),
  },
  {
    key: 'location',
    dataIndex: 'location',
    title: 'Местонахождение',
    sorter: true,
    render: (value: EquipmentTableItem['location']) => valueOr(value?.title),
  },
  {
    key: 'isCredited',
    dataIndex: 'isCredited',
    title: 'Оприходовано',
    render: (value: EquipmentTableItem['isCredited']) => getYesNoWord(value),
  },
  {
    key: 'condition',
    dataIndex: 'condition',
    title: 'Состояние',
    sorter: true,
    render: (value: EquipmentTableItem['condition']) => equipmentConditionDict[value],
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество',
    sorter: true,
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
