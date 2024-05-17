import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { parseResponseTime } from 'modules/task/components/TaskDetails/MainDetails/utils'
import {
  badgeByTaskStatus,
  iconByTaskExtendedStatus,
  iconByTaskStatus,
} from 'modules/task/components/TaskStatus/constants'
import TaskStatus from 'modules/task/components/TaskStatus/index'
import { taskStatusDict } from 'modules/task/constants/task'
import { getOlaStatusTextType } from 'modules/task/utils/task'
import { getShortUserName } from 'modules/user/utils'

import { MaybeNull } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import { TaskTableListItem } from '../types'

const { Text } = Typography

export const getColumns = (): ColumnsType<TaskTableListItem> => [
  {
    key: 'noop',
    render: (_, { status, extendedStatus }) => {
      const taskStatusIcon = iconByTaskStatus[status]
      const extendedStatusIcon = iconByTaskExtendedStatus[extendedStatus]
      const badge = badgeByTaskStatus[status]

      return (
        <TaskStatus
          status={extendedStatusIcon ? extendedStatus : status}
          icon={taskStatusIcon || extendedStatusIcon}
          badge={badge}
        />
      )
    },
  },
  {
    dataIndex: 'id',
    title: 'Заявка',
    sorter: true,
  },
  {
    dataIndex: 'recordId',
    title: 'Внеш.номер',
    sorter: true,
  },
  {
    dataIndex: 'name',
    title: 'Объект',
    ellipsis: true,
    sorter: true,
  },
  {
    dataIndex: 'title',
    title: 'Тема',
    ellipsis: true,
    sorter: true,
  },
  {
    dataIndex: 'assignee',
    title: 'Исполнитель',
    render: (value: MaybeNull<TaskTableListItem['assignee']>) =>
      value ? getShortUserName(value) : '',
    ellipsis: true,
    sorter: true,
  },
  {
    dataIndex: 'supportGroup',
    title: 'Группа поддержки',
    render: (value: TaskTableListItem['supportGroup']) => value?.name,
    sorter: true,
    ellipsis: true,
  },
  {
    dataIndex: 'workGroup',
    title: 'Рабочая группа',
    render: (value: TaskTableListItem['workGroup']) => value?.name,
    sorter: true,
    ellipsis: true,
  },
  {
    dataIndex: 'responseTime',
    title: 'Срок реакции',
    render: (value: TaskTableListItem['responseTime'], { workGroup, assignee }) => {
      if (!!assignee) return null
      const responseTime = parseResponseTime(value, workGroup)
      return responseTime ? <Text type={responseTime.type}>{responseTime.value}</Text> : null
    },
    ellipsis: true,
  },
  {
    dataIndex: 'olaNextBreachTime',
    title: 'Выполнить до',
    render: (value: TaskTableListItem['olaNextBreachTime'], { olaStatus }) => (
      <Text type={getOlaStatusTextType(olaStatus)}>{formatDate(value)}</Text>
    ),
    sorter: true,
    ellipsis: true,
  },
  {
    dataIndex: 'status',
    title: 'Статус',
    ellipsis: true,
    render: (_, { status }) => taskStatusDict[status],
  },
  {
    dataIndex: 'subtasksCounter',
    title: <Text title='Выполнено/Всего'>Задания</Text>,
    render: (_, { subtasksCounter }) =>
      subtasksCounter.all ? `${subtasksCounter.completed}/${subtasksCounter.all}` : '-',
  },
  {
    dataIndex: 'lastComment',
    title: 'Комментарий',
    ellipsis: true,
    sorter: true,
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата создания',
    render: (value: TaskTableListItem['createdAt']) => formatDate(value),
    sorter: true,
    ellipsis: true,
  },
]
