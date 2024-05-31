import { ColumnsType } from 'antd/es/table'

import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'

import { formatDate } from 'shared/utils/date'

import { InventorizationTableItem } from './types'

export const columns: ColumnsType<InventorizationTableItem> = [
  {
    dataIndex: 'type',
    title: 'Тип',
    sorter: true,
    render: (value: InventorizationTableItem['type']) => inventorizationTypeDict[value],
  },
  {
    dataIndex: 'warehouses',
    title: 'Склады',
    render: (value: InventorizationTableItem['warehouses']) => value.map((v) => v.title).join(', '),
  },
  {
    dataIndex: 'deadlineAt',
    title: 'Срок выполнения',
    sorter: true,
    render: (value: InventorizationTableItem['deadlineAt']) => formatDate(value),
  },
  {
    dataIndex: 'executor',
    title: 'Исполнитель',
    sorter: true,
    render: (value: InventorizationTableItem['executor']) => value.fullName,
  },
  {
    dataIndex: 'status',
    title: 'Статус',
    sorter: true,
    render: (value: InventorizationTableItem['status']) => inventorizationStatusDict[value],
  },
  {
    dataIndex: 'createdBy',
    title: 'Автор',
    sorter: true,
    render: (value: InventorizationTableItem['createdBy']) => value.fullName,
  },
  {
    dataIndex: 'createdAt',
    title: 'Создано',
    sorter: true,
    render: (value: InventorizationTableItem['createdAt']) => formatDate(value),
  },
]
