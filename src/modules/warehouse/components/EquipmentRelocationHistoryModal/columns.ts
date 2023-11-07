import { ColumnsType } from 'antd/es/table'

import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'

import { formatDate } from 'shared/utils/date'

import { EquipmentRelocationHistoryTableItem } from './types'

export const columns: ColumnsType<EquipmentRelocationHistoryTableItem> = [
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Инициировано',
    render: (value: EquipmentRelocationHistoryTableItem['createdAt']) => formatDate(value),
  },
  {
    key: 'completedAt',
    dataIndex: 'completedAt',
    title: 'Дата перемещения',
    render: (value: EquipmentRelocationHistoryTableItem['completedAt']) =>
      value && formatDate(value),
  },
  {
    key: 'relocateFrom',
    dataIndex: 'relocateFrom',
    title: 'Объект выбытия',
  },
  {
    key: 'relocateTo',
    dataIndex: 'relocateTo',
    title: 'Объект прибытия',
  },
  {
    key: 'createdBy',
    dataIndex: 'createdBy',
    title: 'Инициатор',
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Статус',
    render: (value: EquipmentRelocationHistoryTableItem['status']) =>
      relocationTaskStatusDict[value],
  },
]
