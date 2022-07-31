import { ColumnsType } from 'antd/es/table'
import React from 'react'

import TaskStatus from 'components/TaskStatus'
import { TaskListItemModel } from 'modules/task/components/TaskList/models'
import {
  ASSIGNEE_WORD,
  OBJECT_WORD,
  THEME_WORD,
} from 'modules/task/constants/words'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { WorkGroupListItemModel } from 'modules/workGroup/components/WorkGroupList/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { MaybeNull } from 'shared/interfaces/utils'
import formatDate from 'shared/utils/date/formatDate'

export const TABLE_COLUMNS: ColumnsType<TaskListItemModel> = [
  {
    key: 'noop',
    render: (value: string, { status }) => <TaskStatus status={status} />,
    align: 'center',
  },
  {
    title: 'Заявка',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Внеш.номер',
    dataIndex: 'recordId',
    key: 'recordId',
  },
  {
    title: OBJECT_WORD,
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
  },
  {
    title: THEME_WORD,
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: ASSIGNEE_WORD,
    dataIndex: 'assignee',
    key: 'assignee',
    render: (value: MaybeNull<TaskListItemModel['assignee']>) =>
      value ? getShortUserName(value) : '',
    ellipsis: true,
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workGroup',
    key: 'workGroup',
    render: (value: MaybeNull<WorkGroupListItemModel>) => value && value.name,
    ellipsis: true,
  },
  {
    title: 'Выполнить до',
    dataIndex: 'olaNextBreachTime',
    key: 'olaNextBreachTime',
    render: (value) => formatDate(value, DATE_TIME_FORMAT),
    sorter: true,
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    key: 'comment',
    ellipsis: true,
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => formatDate(value, DATE_TIME_FORMAT),
    sorter: true,
  },
]
