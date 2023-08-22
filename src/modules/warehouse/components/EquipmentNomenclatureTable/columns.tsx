import { ColumnsType } from 'antd/es/table'

import { EquipmentNomenclatureTableItem } from './types'

export const columns: ColumnsType<EquipmentNomenclatureTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Наименование',
    render: (value: EquipmentNomenclatureTableItem['title']) => value,
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество оборудования',
    render: (value: EquipmentNomenclatureTableItem['quantity']) => value,
  },
]
