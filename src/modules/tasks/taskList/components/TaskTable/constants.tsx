import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { Assignee, Task, WorkGroup } from 'modules/tasks/models'
import { MaybeNull } from 'shared/interfaces/utils'

import BidColumn from './BidColumn'
import { getDateTimeString, getFIOString } from './utils'

export enum ColumnsTypeContentEnum {
  All = 'all',
  Short = 'short',
}

export const TABLE_COLUMNS_SHORT: ColumnsType<Task> = [
  {
    title: 'Заявка',
    dataIndex: 'id',
    width: 150,
    render: (value: string, { status }) => {
      return <BidColumn value={value} status={status} />
    },
    align: 'center',
  },
  {
    title: 'Внеш.номер',
    dataIndex: 'recordId',
    width: 170,
  },
  {
    title: 'Объект',
    dataIndex: 'name',
  },
  {
    title: 'Тема',
    dataIndex: 'title',
    width: 250,
  },
  {
    title: 'Исполнитель',
    dataIndex: 'assignee',
    render: (value: MaybeNull<Assignee>) => getFIOString(value),
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workGroup',
    render: (value: MaybeNull<WorkGroup>) => {
      return value && value.name
    },
  },
]

export const TABLE_COLUMNS_ETC: ColumnsType<Task> = [
  {
    title: 'Выполнить до',
    dataIndex: 'olaNextBreachTime',
    width: 160,
    render: getDateTimeString,
    sorter: true,
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
    sorter: true,
  },
]

export const PERCENT_LIMIT_TO_HANDLE_SCROLL = 80
