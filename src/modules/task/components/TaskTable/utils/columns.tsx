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
import { TaskTableListItem } from 'modules/task/components/TaskTable/types'
import { taskStatusDict } from 'modules/task/constants/task'
import { getOlaStatusTextType } from 'modules/task/utils/task'
import { getShortUserName } from 'modules/user/utils'

import { HYPHEN } from 'shared/constants/common'
import { valueOr } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

const { Text } = Typography

export const getColumns = (): ColumnsType<TaskTableListItem> => [
  {
    key: 'noop',
    render: (_, { status, extendedStatus }) => {
      const taskStatusIcon = iconByTaskStatus[status]
      const extendedStatusIcon = extendedStatus
        ? iconByTaskExtendedStatus[extendedStatus]
        : undefined
      const badge = badgeByTaskStatus[status]

      return (
        <TaskStatus
          status={extendedStatusIcon ? extendedStatus : status}
          icon={extendedStatusIcon || taskStatusIcon}
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
    render: (value: TaskTableListItem['name']) => valueOr(value),
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
    render: (value: TaskTableListItem['assignee']) =>
      valueOr(value, (value) => getShortUserName(value)),
    ellipsis: true,
    sorter: true,
  },
  {
    dataIndex: 'supportGroup',
    title: 'Группа поддержки',
    render: (value: TaskTableListItem['supportGroup']) => valueOr(value?.name),
    sorter: true,
    ellipsis: true,
  },
  {
    dataIndex: 'workGroup',
    title: 'Рабочая группа',
    render: (value: TaskTableListItem['workGroup']) => valueOr(value?.name),
    sorter: true,
    ellipsis: true,
  },
  {
    dataIndex: 'responseTime',
    title: 'Срок реакции',
    render: (value: TaskTableListItem['responseTime'], { workGroup, assignee }) => {
      if (!!assignee) return valueOr(null)
      const responseTime = parseResponseTime(value, workGroup)
      return valueOr(responseTime, (time) => <Text type={time.type}>{time.value}</Text>)
    },
    ellipsis: true,
  },
  {
    dataIndex: 'olaNextBreachTime',
    title: 'Выполнить до',
    render: (value: TaskTableListItem['olaNextBreachTime'], { olaStatus }) => (
      <Text type={olaStatus ? getOlaStatusTextType(olaStatus) : undefined}>
        {formatDate(value)}
      </Text>
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
    width: 100,
    title: <Text title='Выполнено/Всего'>Задания</Text>,
    render: (_, { subtasksCounter }) =>
      subtasksCounter.all ? `${subtasksCounter.completed}/${subtasksCounter.all}` : HYPHEN,
  },
  {
    dataIndex: 'lastComment',
    title: 'Комментарий',
    ellipsis: true,
    sorter: true,
    render: (value: TaskTableListItem['lastComment']) => valueOr(value),
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата создания',
    render: (value: TaskTableListItem['createdAt']) => formatDate(value),
    sorter: true,
    ellipsis: true,
  },
]
