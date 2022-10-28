import { BadgeProps } from 'antd'
import React from 'react'

import { getIconByName, getIconByNameIn, render } from '_tests_/utils'
import { screen } from '@testing-library/react'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import {
  badgeByTaskExtendedStatus,
  badgeByTaskStatus,
  iconByTaskExtendedStatus,
  iconByTaskStatus,
} from './constants'
import TaskStatus from './index'
import { BadgeStyled } from './styles'

export const getTaskStatus = (status: string) =>
  screen.getByTestId(`task-status-${status}`)

export const queryTaskStatus = (status: string) =>
  screen.queryByTestId(`task-status-${status}`)

export const getTaskStatusIcon = (status: string, name: string) =>
  getIconByNameIn(getTaskStatus(status), name)

export const queryTaskStatusBadge = (
  status: string,
  badgeStatus: BadgeProps['status'],
) =>
  // eslint-disable-next-line testing-library/no-node-access
  getTaskStatus(status).querySelector(`.ant-badge-status-${badgeStatus}`)

describe('Получение значка работает корректно по статусу заявки', () => {
  test(`${TaskStatusEnum.New}`, () => {
    const badge = badgeByTaskStatus[TaskStatusEnum.New]
    render(badge!)

    expect(badge).toEqual(<BadgeStyled status='default' />)
  })

  test(`${TaskStatusEnum.InProgress}`, () => {
    const badge = badgeByTaskStatus[TaskStatusEnum.InProgress]
    render(badge!)

    expect(badge).toEqual(<BadgeStyled status='warning' />)
  })

  test(`${TaskStatusEnum.Completed}`, () => {
    const badge = badgeByTaskStatus[TaskStatusEnum.Completed]
    render(badge!)

    expect(badge).toEqual(<BadgeStyled status='success' />)
  })
})

describe('Получение значка работает корректно по расширенному статусу заявки', () => {
  test(`${TaskExtendedStatusEnum.New}`, () => {
    const badge = badgeByTaskExtendedStatus[TaskExtendedStatusEnum.New]
    render(badge!)

    expect(badge).toEqual(<BadgeStyled status='default' />)
  })

  test(`${TaskExtendedStatusEnum.InProgress}`, () => {
    const badge = badgeByTaskExtendedStatus[TaskExtendedStatusEnum.InProgress]
    render(badge!)

    expect(badge).toEqual(<BadgeStyled status='warning' />)
  })

  test(`${TaskExtendedStatusEnum.Completed}`, () => {
    const badge = badgeByTaskExtendedStatus[TaskExtendedStatusEnum.Completed]
    render(badge!)

    expect(badge).toEqual(<BadgeStyled status='success' />)
  })
})

describe('Получение иконки работает корректно по статусу заявки', () => {
  test(`${TaskStatusEnum.Closed}`, () => {
    const icon = iconByTaskStatus[TaskStatusEnum.Closed]
    render(icon!)

    expect(getIconByName('check-circle')).toBeInTheDocument()
  })
})

describe('Получение иконки работает корректно по расширенному статусу заявки', () => {
  test(`${TaskExtendedStatusEnum.Awaiting}`, () => {
    const icon = iconByTaskExtendedStatus[TaskExtendedStatusEnum.Awaiting]
    render(icon!)

    expect(getIconByName('pause-circle')).toBeInTheDocument()
  })

  test(`${TaskExtendedStatusEnum.InReclassification}`, () => {
    const icon =
      iconByTaskExtendedStatus[TaskExtendedStatusEnum.InReclassification]
    render(icon!)

    expect(getIconByName('question-circle')).toBeInTheDocument()
  })

  test(`${TaskExtendedStatusEnum.Returned}`, () => {
    const icon = iconByTaskExtendedStatus[TaskExtendedStatusEnum.Returned]
    render(icon!)

    expect(getIconByName('right-circle')).toBeInTheDocument()
  })

  test(`${TaskExtendedStatusEnum.Closed}`, () => {
    const icon = iconByTaskExtendedStatus[TaskExtendedStatusEnum.Closed]
    render(icon!)

    expect(getIconByName('check-circle')).toBeInTheDocument()
  })
})

describe('TaskStatus', () => {
  test('Отображает значок', () => {
    render(
      <TaskStatus
        status={TaskExtendedStatusEnum.Completed}
        badge={badgeByTaskExtendedStatus[TaskExtendedStatusEnum.Completed]}
      />,
    )

    const status = getTaskStatus(TaskExtendedStatusEnum.Completed)
    const badge = queryTaskStatusBadge(
      TaskExtendedStatusEnum.Completed,
      'success',
    )

    expect(status).toBeInTheDocument()
    expect(badge).toBeInTheDocument()
  })

  test('Отображает иконку', () => {
    render(
      <TaskStatus
        status={TaskExtendedStatusEnum.Awaiting}
        icon={iconByTaskExtendedStatus[TaskExtendedStatusEnum.Awaiting]}
      />,
    )

    const status = getTaskStatus(TaskExtendedStatusEnum.Awaiting)
    const icon = getTaskStatusIcon(
      TaskExtendedStatusEnum.Awaiting,
      'pause-circle',
    )

    expect(status).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  test('Отображается текст', () => {
    const text = 'text'
    render(<TaskStatus status={text} text={text} />)

    expect(screen.getByText(text)).toBeInTheDocument()
  })

  test('Если передать значок и иконку, отображает только иконку', () => {
    const iconByStatus =
      iconByTaskExtendedStatus[TaskExtendedStatusEnum.Awaiting]

    const badgeByStatus =
      badgeByTaskExtendedStatus[TaskExtendedStatusEnum.Completed]

    render(
      <TaskStatus
        status={
          iconByStatus
            ? TaskExtendedStatusEnum.Awaiting
            : TaskExtendedStatusEnum.Completed
        }
        icon={iconByStatus}
        badge={badgeByStatus}
      />,
    )

    const icon = getTaskStatusIcon(
      TaskExtendedStatusEnum.Awaiting,
      'pause-circle',
    )
    const badge = queryTaskStatusBadge(
      TaskExtendedStatusEnum.Awaiting,
      'success',
    )

    expect(icon).toBeInTheDocument()
    expect(badge).not.toBeInTheDocument()
  })

  test('Не отображается, если не передать текст, иконку и значок', () => {
    const fakeStatus = 'status'
    render(<TaskStatus status={fakeStatus} />)

    const status = queryTaskStatus(fakeStatus)
    expect(status).not.toBeInTheDocument()
  })
})
