import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TextProps } from 'antd/es/typography/Text'
import React from 'react'

import { TaskStatusEnum } from '../TaskListPage/constants'
import BidColumn from './BidColumn'

const { Text } = Typography

// TODO: добавить правильный тип в ColumnsType как генерация типов будет готова
export const tableColumns: ColumnsType<{ status: TaskStatusEnum }> = [
  {
    title: 'Заявка',
    dataIndex: 'task',
    width: 150,
    render: (value: string, { status }) => {
      return <BidColumn value={value} status={status} />
    },
  },
  {
    title: 'Внеш.номер',
    dataIndex: 'foreignNumber',
    width: 170,
  },
  {
    title: 'Объект',
    dataIndex: 'object',
  },
  {
    title: 'Тема',
    dataIndex: 'theme',
    width: 250,
  },
  {
    title: 'Исполнитель',
    dataIndex: 'executor',
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workingGroup',
  },
  {
    title: 'Выполнить до',
    dataIndex: 'executeBefore',
    width: 160,
    render: (value: string, record) => {
      // TODO: поправить условие как будет готов бэк
      const type: TextProps['type'] = true ? 'warning' : 'success'

      return (
        <Text type={type} strong>
          {value}
        </Text>
      )
    },
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
  },
]
