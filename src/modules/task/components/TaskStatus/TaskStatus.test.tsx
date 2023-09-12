import { screen, within } from '@testing-library/react'
import { BadgeProps } from 'antd'
import React from 'react'

import { TaskExtendedStatusEnum, TaskStatusEnum } from 'modules/task/constants'

import { iconTestUtils, render } from '_tests_/utils'

import {
  badgeByTaskExtendedStatus,
  badgeByTaskStatus,
  iconByTaskExtendedStatus,
  iconByTaskStatus,
} from './constants'
import TaskStatus from './index'
import { BadgeStyled } from './styles'

const getContainer = (status: string) =>
  screen.getByTestId(`task-status-${status}`)

const getContainerIn = (container: HTMLElement, status: string) =>
  within(container).getByTestId(`task-status-${status}`)

const queryContainer = (status: string) =>
  screen.queryByTestId(`task-status-${status}`)

const getIcon = (status: string, name: string) =>
  iconTestUtils.getIconByNameIn(getContainer(status), name)

const queryBadge = (status: string, badgeStatus: BadgeProps['status']) =>
  // eslint-disable-next-line testing-library/no-node-access
  getContainer(status).querySelector(`.ant-badge-status-${badgeStatus}`)

export const testUtils = {
  getContainer,
  getContainerIn,
  queryContainer,
  getIcon,
  queryBadge,
}

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
  test(`${TaskStatusEnum.Awaiting}`, () => {
    const icon = iconByTaskStatus[TaskStatusEnum.Awaiting]
    render(icon!)

    expect(iconTestUtils.getIconByName('pause-circle')).toBeInTheDocument()
  })

  test(`${TaskStatusEnum.Closed}`, () => {
    const icon = iconByTaskStatus[TaskStatusEnum.Closed]
    render(icon!)

    expect(iconTestUtils.getIconByName('check-circle')).toBeInTheDocument()
  })
})

describe('Получение иконки работает корректно по расширенному статусу заявки', () => {
  test(`${TaskExtendedStatusEnum.Awaiting}`, () => {
    const icon = iconByTaskExtendedStatus[TaskExtendedStatusEnum.Awaiting]
    render(icon!)

    expect(iconTestUtils.getIconByName('pause-circle')).toBeInTheDocument()
  })

  test(`${TaskExtendedStatusEnum.InReclassification}`, () => {
    const icon =
      iconByTaskExtendedStatus[TaskExtendedStatusEnum.InReclassification]
    render(icon!)

    expect(iconTestUtils.getIconByName('question-circle')).toBeInTheDocument()
  })

  test(`${TaskExtendedStatusEnum.Returned}`, () => {
    const icon = iconByTaskExtendedStatus[TaskExtendedStatusEnum.Returned]
    render(icon!)

    expect(iconTestUtils.getIconByName('right-circle')).toBeInTheDocument()
  })

  test(`${TaskExtendedStatusEnum.Closed}`, () => {
    const icon = iconByTaskExtendedStatus[TaskExtendedStatusEnum.Closed]
    render(icon!)

    expect(iconTestUtils.getIconByName('check-circle')).toBeInTheDocument()
  })

  test(`${TaskExtendedStatusEnum.FirstLineReturned}`, () => {
    const icon =
      iconByTaskExtendedStatus[TaskExtendedStatusEnum.FirstLineReturned]
    render(icon!)

    expect(iconTestUtils.getIconByName('exclamation-circle')).toBeInTheDocument()
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

    const status = testUtils.getContainer(TaskExtendedStatusEnum.Completed)
    const badge = testUtils.queryBadge(
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

    const status = testUtils.getContainer(TaskExtendedStatusEnum.Awaiting)
    const icon = testUtils.getIcon(
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

    const icon = testUtils.getIcon(
      TaskExtendedStatusEnum.Awaiting,
      'pause-circle',
    )
    const badge = testUtils.queryBadge(
      TaskExtendedStatusEnum.Awaiting,
      'success',
    )

    expect(icon).toBeInTheDocument()
    expect(badge).not.toBeInTheDocument()
  })

  test('Не отображается, если не передать текст, иконку и значок', () => {
    const fakeStatus = 'status'
    render(<TaskStatus status={fakeStatus} />)

    const status = testUtils.queryContainer(fakeStatus)
    expect(status).not.toBeInTheDocument()
  })
})
