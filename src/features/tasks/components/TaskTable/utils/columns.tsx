import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { parseResponseTime } from 'features/tasks/components/TaskDetails/MainDetails/utils'
import {
  badgeByTaskStatus,
  iconByTaskExtendedStatus,
  iconByTaskStatus,
} from 'features/tasks/components/TaskStatus/constants'
import TaskStatus from 'features/tasks/components/TaskStatus/index'
import { TaskTableItem } from 'features/tasks/components/TaskTable/types'
import { taskStatusDict } from 'features/tasks/constants'
import { getOlaStatusTextType } from 'features/tasks/helpers'
import { getShortUserName } from 'features/users/helpers'
import React from 'react'

import { HYPHEN } from 'shared/constants/common'
import { valueOr } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

const { Text } = Typography

export const getColumns = (): ColumnsType<TaskTableItem> => [
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
    render: (value: TaskTableItem['id']) => valueOr(value),
  },
  {
    dataIndex: 'recordId',
    title: 'Внеш.номер',
    sorter: true,
    render: (value: TaskTableItem['recordId']) => valueOr(value),
  },
  {
    dataIndex: 'name',
    title: 'Объект',
    ellipsis: true,
    sorter: true,
    render: (value: TaskTableItem['name']) => valueOr(value),
  },
  {
    dataIndex: 'title',
    title: 'Тема',
    ellipsis: true,
    sorter: true,
    render: (value: TaskTableItem['title']) => valueOr(value),
  },
  {
    dataIndex: 'assignee',
    title: 'Исполнитель',
    render: (value: TaskTableItem['assignee']) =>
      valueOr(value, (value) => getShortUserName(value)),
    ellipsis: true,
    sorter: true,
  },
  {
    dataIndex: 'supportGroup',
    title: 'Группа поддержки',
    render: (value: TaskTableItem['supportGroup']) => valueOr(value?.name),
    sorter: true,
    ellipsis: true,
  },
  {
    dataIndex: 'workGroup',
    title: 'Рабочая группа',
    render: (value: TaskTableItem['workGroup']) => valueOr(value?.name),
    sorter: true,
    ellipsis: true,
  },
  {
    dataIndex: 'responseTime',
    title: 'Срок реакции',
    render: (value: TaskTableItem['responseTime'], { workGroup, assignee }) => {
      if (!!assignee) return valueOr(null)
      const responseTime = parseResponseTime(value, workGroup)
      return valueOr(responseTime, (time) => <Text type={time.type}>{time.value}</Text>)
    },
    ellipsis: true,
  },
  {
    dataIndex: 'olaNextBreachTime',
    title: 'Выполнить до',
    render: (value: TaskTableItem['olaNextBreachTime'], { olaStatus }) =>
      valueOr(value, (value) => (
        <Text type={olaStatus ? getOlaStatusTextType(olaStatus) : undefined}>
          {formatDate(value)}
        </Text>
      )),
    sorter: true,
    ellipsis: true,
  },
  {
    dataIndex: 'status',
    title: 'Статус',
    ellipsis: true,
    render: (_, { status }) => valueOr(status, (value) => taskStatusDict[value]),
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
    render: (value: TaskTableItem['lastComment']) => valueOr(value),
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата создания',
    render: (value: TaskTableItem['createdAt']) => valueOr(value, (value) => formatDate(value)),
    sorter: true,
    ellipsis: true,
  },
]
