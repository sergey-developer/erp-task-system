import { ColumnsType } from 'antd/es/table'

import {
  relocationTaskStatusDict,
  relocationTaskTypeDict,
} from 'modules/warehouse/constants/relocationTask'

import { valueOr } from 'shared/utils/common'

import { ExecuteInventorizationRelocationTaskTableItem } from './types'

export const columns: ColumnsType<ExecuteInventorizationRelocationTaskTableItem> = [
  {
    dataIndex: 'type',
    title: 'Тип заявки',
    sorter: true,
    render: (value: ExecuteInventorizationRelocationTaskTableItem['type']) =>
      relocationTaskTypeDict[value],
  },
  {
    dataIndex: 'relocateFrom',
    title: 'Объект выбытия',
    sorter: true,
    render: (value: ExecuteInventorizationRelocationTaskTableItem['relocateFrom']) =>
      valueOr(value?.title),
  },
  {
    dataIndex: 'relocateTo',
    title: 'Объект прибытия',
    sorter: true,
    render: (value: ExecuteInventorizationRelocationTaskTableItem['relocateTo']) =>
      valueOr(value?.title),
  },
  {
    dataIndex: 'status',
    title: 'Статус',
    sorter: true,
    render: (value: ExecuteInventorizationRelocationTaskTableItem['status']) =>
      relocationTaskStatusDict[value],
  },
]
