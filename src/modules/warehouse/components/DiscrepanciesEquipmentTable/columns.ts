import { ColumnsType } from 'antd/es/table'

import { makeString } from 'shared/utils/string'

import { DiscrepanciesEquipmentTableItem } from './types'

export const columns: ColumnsType<DiscrepanciesEquipmentTableItem> = [
  {
    dataIndex: 'equipment',
    title: 'Наименование',
    sorter: true,
    render: (value: DiscrepanciesEquipmentTableItem['equipment']) =>
      makeString(' ', value.title, value.serialNumber, value.inventoryNumber),
  },
  {
    dataIndex: 'locationPlan',
    title: 'Плановое местонахождение',
    sorter: true,
    render: (value: DiscrepanciesEquipmentTableItem['locationPlan']) => value?.title,
  },
  {
    dataIndex: 'locationFact',
    title: 'Фактическое местонахождение',
    sorter: true,
    render: (value: DiscrepanciesEquipmentTableItem['locationFact']) => value?.title,
  },
  {
    dataIndex: 'quantity',
    title: 'Расхождение',
    sorter: true,
    render: (value: DiscrepanciesEquipmentTableItem['quantity']) => value.diff,
  },
]
