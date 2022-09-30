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
import valueOr from 'shared/utils/common/valueOr'
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
    key: 'id',
    dataIndex: 'id',
    title: 'Заявка',
    sorter: true,
  },
  {
    key: 'recordId',
    dataIndex: 'recordId',
    title: 'Внеш.номер',
    sorter: true,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: OBJECT_WORD,
    ellipsis: true,
    sorter: true,
  },
  {
    key: 'title',
    dataIndex: 'title',
    title: THEME_WORD,
    ellipsis: true,
    sorter: true,
  },
  {
    key: 'assignee',
    dataIndex: 'assignee',
    title: ASSIGNEE_WORD,
    render: (value: MaybeNull<TaskTableListItem['assignee']>) =>
      value ? getShortUserName(value) : '',
    ellipsis: true,
    sorter: true,
  },
  {
    key: 'workGroup',
    dataIndex: 'workGroup',
    title: 'Рабочая группа',
    render: (value: MaybeNull<TaskTableListItem['workGroup']>) =>
      valueOr(value?.name, 'I линия поддержки'),
    ellipsis: true,
    sorter: true,
  },
  {
    key: 'olaNextBreachTime',
    dataIndex: 'olaNextBreachTime',
    title: 'Выполнить до',
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
    key: 'comment',
    dataIndex: 'comment',
    title: 'Комментарий',
    ellipsis: true,
    sorter: true,
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Дата создания',
    render: (value) => formatDate(value, DATE_TIME_FORMAT),
    sorter: true,
  },
]
