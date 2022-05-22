import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { Assignee, Task, WorkGroup } from 'modules/tasks/models'
import { MaybeNull } from 'shared/interfaces/utils'

import BidColumn from './BidColumn'
import { getDateTimeString, getFIOString } from './utils'

export const TABLE_COLUMNS: ColumnsType<Task> = [
  {
    key: 'noop',
    width: 52,
    render: (value: string, { status }) => {
      return <BidColumn value='' status={status} />
    },
    align: 'center',
  },
  {
    title: 'Заявка',
    dataIndex: 'id',
    key: 'id',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Внеш.номер',
    dataIndex: 'recordId',
    key: 'recordId',
    width: 180,
    ellipsis: true,
  },
  {
    title: 'Объект',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    ellipsis: true,
  },
  {
    title: 'Тема',
    dataIndex: 'title',
    key: 'title',
    width: 340,
    ellipsis: true,
  },
  {
    title: 'Исполнитель',
    dataIndex: 'assignee',
    key: 'assignee',
    render: (value: MaybeNull<Assignee>) => getFIOString(value),
    width: 180,
    ellipsis: true,
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workGroup',
    key: 'workGroup',
    render: (value: MaybeNull<WorkGroup>) => {
      return value && value.name
    },
    width: 180,
    ellipsis: true,
  },
  {
    title: 'Выполнить до',
    dataIndex: 'olaNextBreachTime',
    key: 'olaNextBreachTime',
    width: 180,
    render: getDateTimeString,
    sorter: true,
    ellipsis: true,
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    key: 'comment',
    width: 240,
    ellipsis: true,
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    render: getDateTimeString,
    sorter: true,
    ellipsis: true,
  },
]
