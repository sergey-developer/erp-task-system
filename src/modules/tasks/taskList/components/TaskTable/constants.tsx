import { ColumnsType } from 'antd/es/table'
import React from 'react'

import TaskStatus from 'components/TaskStatus'
import {
  ASSIGNEE_WORD,
  OBJECT_WORD,
  THEME_WORD,
} from 'modules/tasks/constants/words'
import { TaskListItemModel } from 'modules/tasks/taskList/models'
import { WorkGroupListItemModel } from 'modules/workGroups/workGroupList/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { MaybeNull } from 'shared/interfaces/utils'
import formatDate from 'shared/utils/date/formatDate'

import { getFIOString } from './utils'

export const TABLE_COLUMNS: ColumnsType<TaskListItemModel> = [
  {
    key: 'noop',
    width: 52,
    render: (value: string, { status }) => {
      return <TaskStatus status={status} />
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
    title: OBJECT_WORD,
    dataIndex: 'name',
    key: 'name',
    width: 180,
  },
  {
    title: THEME_WORD,
    dataIndex: 'title',
    key: 'title',
    width: 340,
  },
  {
    title: ASSIGNEE_WORD,
    dataIndex: 'assignee',
    key: 'assignee',
    render: (value: MaybeNull<TaskListItemModel['assignee']>) =>
      getFIOString(value),
    width: 180,
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workGroup',
    key: 'workGroup',
    render: (value: MaybeNull<WorkGroupListItemModel>) => {
      return value && value.name
    },
    width: 180,
  },
  {
    title: 'Выполнить до',
    dataIndex: 'olaNextBreachTime',
    key: 'olaNextBreachTime',
    width: 180,
    render: (value) => formatDate(value, DATE_TIME_FORMAT),
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
    render: (value) => formatDate(value, DATE_TIME_FORMAT),
    sorter: true,
  },
]
