import { ColumnsType } from 'antd/es/table'

import { valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { RelocationTaskTableItem } from './types'

export const columns: ColumnsType<RelocationTaskTableItem> = [
  {
    key: 'deadlineAt',
    dataIndex: 'deadlineAt',
    title: 'Срок выполнения',
    render: (value: RelocationTaskTableItem['deadlineAt']) => formatDate(value),
  },
  {
    key: 'relocateFrom',
    dataIndex: 'relocateFrom',
    title: 'Объект выбытия',
    render: (value: RelocationTaskTableItem['relocateFrom']) => valueOrHyphen(value?.title),
  },
  {
    key: 'relocateTo',
    dataIndex: 'relocateTo',
    title: 'Объект прибытия',
    render: (value: RelocationTaskTableItem['relocateTo']) => valueOrHyphen(value?.title),
  },
  {
    key: 'executor',
    dataIndex: 'executor',
    title: 'Исполнитель',
    render: (value: RelocationTaskTableItem['executor']) => valueOrHyphen(value?.fullName),
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Статус',
    render: (value: RelocationTaskTableItem['status']) => value,
  },
  {
    key: 'createdBy',
    dataIndex: 'createdBy',
    title: 'Инициатор',
    render: (value: RelocationTaskTableItem['createdBy']) => valueOrHyphen(value?.fullName),
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Создано',
    render: (value: RelocationTaskTableItem['createdAt']) => formatDate(value),
  },
]
