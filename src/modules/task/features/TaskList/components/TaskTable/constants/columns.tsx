import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'

import { taskStatusDict } from 'modules/task/constants/dictionary'
import {
  badgeByTaskStatus,
  iconByTaskExtendedStatus,
  iconByTaskStatus,
} from 'modules/task/features/TaskStatus/constants'
import TaskStatus from 'modules/task/features/TaskStatus/index'
import getOlaStatusTextType from 'modules/task/utils/getOlaStatusTextType'
import { getShortUserName, getUserRoleMap } from 'modules/user/utils'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { UserRolesEnum } from 'shared/constants/roles'
import { MaybeNull } from 'shared/interfaces/utils'
import valueOr from 'shared/utils/common/valueOr'
import formatDate from 'shared/utils/date/formatDate'

import { TaskTableListItem } from '../interfaces'
import { statusSorter } from '../utils'

const { Text } = Typography

export const getTableColumns = (
  role: UserRolesEnum,
): ColumnsType<TaskTableListItem> => {
  const roleMap = getUserRoleMap(role)

  return [
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
      title: 'Объект',
      ellipsis: true,
      sorter: true,
    },
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Тема',
      ellipsis: true,
      sorter: true,
    },
    {
      key: 'assignee',
      dataIndex: 'assignee',
      title: 'Исполнитель',
      render: (value: MaybeNull<TaskTableListItem['assignee']>) =>
        value ? getShortUserName(value) : '',
      ellipsis: true,
      sorter: true,
    },
    ...(roleMap.isFirstLineSupportRole
      ? [
          {
            key: 'supportGroup',
            dataIndex: 'supportGroup',
            title: 'Группа поддержки',
            render: (value: TaskTableListItem['supportGroup']) => value?.name,
            ellipsis: true,
            sorter: true,
          },
        ]
      : [
          {
            key: 'workGroup',
            dataIndex: 'workGroup',
            title: 'Рабочая группа',
            render: (value: TaskTableListItem['workGroup']) =>
              valueOr(value?.name, 'I линия поддержки'),
            ellipsis: true,
            sorter: true,
          },
        ]),
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
      key: 'status',
      dataIndex: 'status',
      title: 'Статус',
      ellipsis: true,
      sorter: statusSorter,
      render: (_, { status }) => taskStatusDict[status],
    },
    {
      key: 'lastComment',
      dataIndex: 'lastComment',
      title: 'Комментарий',
      ellipsis: true,
      sorter: true,
      render: (value: TaskTableListItem['lastComment']) => value,
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: 'Дата создания',
      render: (value: TaskTableListItem['createdAt']) =>
        formatDate(value, DATE_TIME_FORMAT),
      sorter: true,
    },
  ]
}
