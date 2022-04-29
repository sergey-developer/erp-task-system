import { Badge } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'

export const tableColumns: ColumnsType<any> = [
  {
    title: 'Заявка',
    dataIndex: 'task',
    key: 'task',
    width: 150,
    render: (value: string) => <Badge status='default' text={value} />,
  },
  {
    title: 'Внеш.номер',
    dataIndex: 'foreignNumber',
    width: 170,
    key: 'foreignNumber',
  },
  {
    title: 'Объект',
    dataIndex: 'object',
    key: 'object',
  },
  {
    title: 'Тема',
    dataIndex: 'theme',
    width: 250,
    key: 'theme',
  },
  {
    title: 'Исполнитель',
    dataIndex: 'executor',
    key: 'executor',
  },
  {
    title: 'Рабочая группа',
    dataIndex: 'workingGroup',
    key: 'workingGroup',
  },
  {
    title: 'Выполнить до',
    dataIndex: 'executeBefore',
    width: 160,
    key: 'executeBefore',
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    width: 150,
    key: 'comment',
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    width: 160,
    key: 'createdAt',
  },
]

export enum FiltersEnum {
  All = 'all',
  Overdue = 'overdue',
  DecideToday = 'decideToday',
  Free = 'free',
}
