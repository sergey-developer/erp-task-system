import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { Task } from 'modules/tasks/models'

import BidColumn from './BidColumn'
import { getDateTimeString } from './utils'

export const TABLE_COLUMNS_SHORT: ColumnsType<Task> = [
  {
    title: 'Заявка',
    dataIndex: 'task',
    width: 150,
    render: (value: string, { status }) => {
      return <BidColumn value={value} status={status} />
    },
    ellipsis: true,
  },
  {
    title: 'Внеш.номер',
    dataIndex: 'recordId',
    width: 170,
    ellipsis: true,
  },
  {
    title: 'Объект',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: 'Тема',
    dataIndex: 'title',
    width: 250,
    ellipsis: true,
  },
  {
    title: 'Исполнитель',
    dataIndex: 'assignee',
    ellipsis: true,
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workGroup',
  },
]

export const TABLE_COLUMNS_ETC: ColumnsType<Task> = [
  {
    title: 'Выполнить до',
    dataIndex: 'slaNextBreachAt',
    width: 160,
    render: getDateTimeString,
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    width: 150,
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    width: 160,
    render: getDateTimeString,
  },
]
