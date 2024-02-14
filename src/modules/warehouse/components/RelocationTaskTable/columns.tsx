import { ColumnsType } from 'antd/es/table'

import {
  relocationTaskStatusDict,
  relocationTaskTypeDict,
} from 'modules/warehouse/constants/relocationTask'

import { valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { RelocationTaskTableItem } from './types'

export const columns: ColumnsType<RelocationTaskTableItem> = [
  // {
  //   dataIndex: 'id',
  //   title: '№',
  //   sorter: true,
  //   width: 100,
  //   render: (value: RelocationTaskTableItem['id']) => value,
  // },
  {
    dataIndex: 'type',
    title: 'Тип заявки',
    sorter: true,
    render: (value: RelocationTaskTableItem['type']) => relocationTaskTypeDict[value],
  },
  {
    dataIndex: 'deadlineAt',
    title: 'Срок выполнения',
    sorter: true,
    render: (value: RelocationTaskTableItem['deadlineAt']) => formatDate(value),
  },
  {
    dataIndex: 'relocateFrom',
    title: 'Объект выбытия',
    sorter: true,
    render: (value: RelocationTaskTableItem['relocateFrom']) => valueOrHyphen(value?.title),
  },
  {
    dataIndex: 'relocateTo',
    title: 'Объект прибытия',
    sorter: true,
    render: (value: RelocationTaskTableItem['relocateTo']) => valueOrHyphen(value?.title),
  },
  {
    dataIndex: 'executor',
    title: 'Исполнитель',
    sorter: true,
    render: (value: RelocationTaskTableItem['executor']) => valueOrHyphen(value?.fullName),
  },
  {
    dataIndex: 'controller',
    title: 'Контролер',
    sorter: true,
    render: (value: RelocationTaskTableItem['controller']) => valueOrHyphen(value?.fullName),
  },
  {
    dataIndex: 'status',
    title: 'Статус',
    sorter: true,
    render: (value: RelocationTaskTableItem['status']) => relocationTaskStatusDict[value],
  },
  {
    dataIndex: 'createdBy',
    title: 'Инициатор',
    sorter: true,
    render: (value: RelocationTaskTableItem['createdBy']) => valueOrHyphen(value?.fullName),
  },
  {
    dataIndex: 'createdAt',
    title: 'Создано',
    sorter: true,
    render: (value: RelocationTaskTableItem['createdAt']) => formatDate(value),
  },
]
