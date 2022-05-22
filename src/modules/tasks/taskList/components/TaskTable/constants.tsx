import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { Assignee, Task, WorkGroup } from 'modules/tasks/models'
import { MaybeNull } from 'shared/interfaces/utils'

import BidColumn from './BidColumn'
import { getDateTimeString, getFIOString } from './utils'

export const TABLE_COLUMNS: ColumnsType<Task> = [
  {
    title: 'Заявка',
    dataIndex: 'id',
    key: 'id',
    width: 150,
    render: (value: string, { status }) => {
      return <BidColumn value={value} status={status} />
    },
    align: 'center',
  },
  {
    title: 'Внеш.номер',
    dataIndex: 'recordId',
    key: 'recordId',
    width: 170,
  },
  {
    title: 'Объект',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Тема',
    dataIndex: 'title',
    key: 'title',
    width: 250,
  },
  {
    title: 'Исполнитель',
    dataIndex: 'assignee',
    key: 'assignee',
    render: (value: MaybeNull<Assignee>) => getFIOString(value),
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workGroup',
    key: 'workGroup',
    render: (value: MaybeNull<WorkGroup>) => {
      return value && value.name
    },
  },
  {
    title: 'Выполнить до',
    dataIndex: 'olaNextBreachTime',
    key: 'olaNextBreachTime',
    width: 160,
    render: getDateTimeString,
    sorter: true,
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    key: 'comment',
    width: 150,
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 160,
    render: getDateTimeString,
    sorter: true,
  },
]
