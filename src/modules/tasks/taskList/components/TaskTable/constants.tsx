import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { TaskStatusEnum } from '../TaskListPage/constants'
import BidColumn from './BidColumn'

export const TABLE_COLUMNS_SHORT: ColumnsType<{ status: TaskStatusEnum }> = [
  {
    title: 'Заявка',
    dataIndex: 'task',
    width: 150,
    render: (value: string, { status }) => {
      return <BidColumn value={value} status={status} />
    },
  },
  {
    title: 'Внеш.номер',
    dataIndex: 'foreignNumber',
    width: 170,
  },
  {
    title: 'Объект',
    dataIndex: 'object',
  },
  {
    title: 'Тема',
    dataIndex: 'theme',
    width: 250,
  },
  {
    title: 'Исполнитель',
    dataIndex: 'executor',
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workingGroup',
  },
]

export const TABLE_COLUMNS_ETC: ColumnsType<{ status: TaskStatusEnum }> = [
  {
    title: 'Выполнить до',
    dataIndex: 'executeBefore',
    width: 160,
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
  },
]
