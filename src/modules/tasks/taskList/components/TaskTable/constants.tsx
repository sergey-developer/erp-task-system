import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { WorkGroupModel } from 'modules/workGroups/models'
import { MaybeNull } from 'shared/interfaces/utils'

import { Task } from 'modules/tasks/taskList/models'
import BidColumn from './BidColumn'
import { getDateTimeString, getFIOString } from './utils'

export const TABLE_COLUMNS: ColumnsType<Task> = [
  {
    key: 'noop',
    width: 52,
    render: (value: string, { status }) => {
      return <BidColumn status={status} />
    },
    align: 'center',
  },
  {
    title: 'Заявка',
    dataIndex: 'id',
    key: 'id',
    width: 150,
  },
  {
    title: 'Внеш.номер',
    dataIndex: 'recordId',
    key: 'recordId',
    width: 180,
  },
  {
    title: 'Объект',
    dataIndex: 'name',
    key: 'name',
    width: 180,
  },
  {
    title: 'Тема',
    dataIndex: 'title',
    key: 'title',
    width: 340,
  },
  {
    title: 'Исполнитель',
    dataIndex: 'assignee',
    key: 'assignee',
    render: (value: MaybeNull<Task['assignee']>) => getFIOString(value),
    width: 180,
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workGroup',
    key: 'workGroup',
    render: (value: MaybeNull<WorkGroupModel>) => {
      return value && value.name
    },
    width: 180,
  },
  {
    title: 'Выполнить до',
    dataIndex: 'olaNextBreachTime',
    key: 'olaNextBreachTime',
    width: 180,
    render: getDateTimeString,
    sorter: true,
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    key: 'comment',
    width: 240,
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    render: getDateTimeString,
    sorter: true,
  },
]
