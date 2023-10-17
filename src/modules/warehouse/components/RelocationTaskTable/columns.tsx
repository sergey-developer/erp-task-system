import { ColumnsType } from 'antd/es/table'

import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'

import { valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { RelocationTaskTableItem } from './types'

export const columns: ColumnsType<RelocationTaskTableItem> = [
  {
    key: 'deadlineAt',
    dataIndex: 'deadlineAt',
    title: 'Срок выполнения',
    sorter: true,
    render: (value: RelocationTaskTableItem['deadlineAt']) => formatDate(value),
  },
  {
    key: 'relocateFrom',
    dataIndex: 'relocateFrom',
    title: 'Объект выбытия',
    sorter: true,
    render: (value: RelocationTaskTableItem['relocateFrom']) => valueOrHyphen(value?.title),
  },
  {
    key: 'relocateTo',
    dataIndex: 'relocateTo',
    title: 'Объект прибытия',
    sorter: true,
    render: (value: RelocationTaskTableItem['relocateTo']) => valueOrHyphen(value?.title),
  },
  {
    key: 'executor',
    dataIndex: 'executor',
    title: 'Исполнитель',
    sorter: true,
    render: (value: RelocationTaskTableItem['executor']) => valueOrHyphen(value?.fullName),
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Статус',
    sorter: true,
    render: (value: RelocationTaskTableItem['status']) => relocationTaskStatusDict[value],
  },
  {
    key: 'createdBy',
    dataIndex: 'createdBy',
    title: 'Инициатор',
    sorter: true,
    render: (value: RelocationTaskTableItem['createdBy']) => valueOrHyphen(value?.fullName),
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Создано',
    sorter: true,
    render: (value: RelocationTaskTableItem['createdAt']) => formatDate(value),
  },
]
