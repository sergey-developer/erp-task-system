import { ColumnsType } from 'antd/es/table'
import Attachments from 'features/attachments/components/Attachments'
import { relocationTaskStatusDict } from 'features/warehouse/constants/relocationTask'

import { formatDate } from 'shared/utils/date'

import { EquipmentRelocationHistoryTableItem } from './types'

export const columns: ColumnsType<EquipmentRelocationHistoryTableItem> = [
  {
    dataIndex: 'id',
    title: '№ заявки',
  },
  {
    dataIndex: 'createdAt',
    title: 'Инициировано',
    render: (value: EquipmentRelocationHistoryTableItem['createdAt']) => formatDate(value),
  },
  {
    dataIndex: 'completedAt',
    title: 'Дата перемещения',
    render: (value: EquipmentRelocationHistoryTableItem['completedAt']) =>
      value && formatDate(value),
  },
  {
    dataIndex: 'relocateFrom',
    title: 'Объект выбытия',
  },
  {
    dataIndex: 'relocateTo',
    title: 'Объект прибытия',
  },
  {
    dataIndex: 'createdBy',
    title: 'Инициатор',
  },
  {
    dataIndex: 'status',
    title: 'Статус',
    render: (value: EquipmentRelocationHistoryTableItem['status']) =>
      relocationTaskStatusDict[value],
  },
  {
    dataIndex: 'documents',
    title: 'Вложения',
    render: (value: EquipmentRelocationHistoryTableItem['documents']) =>
      !!value?.length && <Attachments data={value} showAboutInPopover />,
  },
  {
    dataIndex: 'externalRelocation',
    title: 'Номер перемещения на портале заказчика',
    render: (value: EquipmentRelocationHistoryTableItem['externalRelocation']) => value?.number,
  },
]
