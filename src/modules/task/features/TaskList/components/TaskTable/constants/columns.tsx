import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'

import {
  ASSIGNEE_WORD,
  OBJECT_WORD,
  THEME_WORD,
} from 'modules/task/constants/words'
import TaskStatus from 'modules/task/features/TaskStatus'
import getOlaStatusTextType from 'modules/task/utils/getOlaStatusTextType'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { MaybeNull } from 'shared/interfaces/utils'
import formatDate from 'shared/utils/date/formatDate'

import { TaskTableListItem } from '../interfaces'

const { Text } = Typography

export const tableColumns: ColumnsType<TaskTableListItem> = [
  {
    key: 'noop',
    render: (value: string, { status, extendedStatus }) => (
      <TaskStatus status={status} extendedStatus={extendedStatus} />
    ),
    align: 'center',
  },
  {
    title: 'Заявка',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
  },
  {
    title: 'Внеш.номер',
    dataIndex: 'recordId',
    key: 'recordId',
    sorter: true,
  },
  {
    title: OBJECT_WORD,
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    sorter: true,
  },
  {
    title: THEME_WORD,
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    sorter: true,
  },
  {
    title: ASSIGNEE_WORD,
    dataIndex: 'assignee',
    key: 'assignee',
    render: (value: MaybeNull<TaskTableListItem['assignee']>) =>
      value ? getShortUserName(value) : '',
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workGroup',
    key: 'workGroup',
    render: (value: MaybeNull<TaskTableListItem['workGroup']>) =>
      value && value.name,
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'Выполнить до',
    dataIndex: 'olaNextBreachTime',
    key: 'olaNextBreachTime',
    render: (
      value: MaybeNull<TaskTableListItem['olaNextBreachTime']>,
      { olaStatus },
    ) => (
      <Text type={getOlaStatusTextType(olaStatus)}>
        {formatDate(value, DATE_TIME_FORMAT)}
      </Text>
    ),
    sorter: true,
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    key: 'comment',
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => formatDate(value, DATE_TIME_FORMAT),
    sorter: true,
  },
]
