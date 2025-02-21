import { screen } from '@testing-library/react'
import React from 'react'

import { TaskExtendedStatusEnum, TaskStatusEnum } from 'features/tasks/api/constants'

import { taskStatusTestUtils } from '_tests_/features/tasks/components/TaskStatus/testUtils'
import { iconTestUtils, render } from '_tests_/helpers'

import {
  badgeByTaskExtendedStatus,
  badgeByTaskStatus,
  iconByTaskExtendedStatus,
  iconByTaskStatus,
} from './constants'
import TaskStatus from './index'
import { BadgeStyled } from './styles'

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
    const icon = iconByTaskExtendedStatus[TaskExtendedStatusEnum.InReclassification]
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
    const icon = iconByTaskExtendedStatus[TaskExtendedStatusEnum.FirstLineReturned]
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

    const status = taskStatusTestUtils.getContainer(TaskExtendedStatusEnum.Completed)
    const badge = taskStatusTestUtils.queryBadge(TaskExtendedStatusEnum.Completed, 'success')

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

    const status = taskStatusTestUtils.getContainer(TaskExtendedStatusEnum.Awaiting)
    const icon = taskStatusTestUtils.getIcon(TaskExtendedStatusEnum.Awaiting, 'pause-circle')

    expect(status).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  test('Отображается текст', () => {
    const text = 'text'
    render(<TaskStatus status={text} text={text} />)

    expect(screen.getByText(text)).toBeInTheDocument()
  })

  test('Если передать значок и иконку, отображает только иконку', () => {
    const iconByStatus = iconByTaskExtendedStatus[TaskExtendedStatusEnum.Awaiting]

    const badgeByStatus = badgeByTaskExtendedStatus[TaskExtendedStatusEnum.Completed]

    render(
      <TaskStatus
        status={iconByStatus ? TaskExtendedStatusEnum.Awaiting : TaskExtendedStatusEnum.Completed}
        icon={iconByStatus}
        badge={badgeByStatus}
      />,
    )

    const icon = taskStatusTestUtils.getIcon(TaskExtendedStatusEnum.Awaiting, 'pause-circle')
    const badge = taskStatusTestUtils.queryBadge(TaskExtendedStatusEnum.Awaiting, 'success')

    expect(icon).toBeInTheDocument()
    expect(badge).not.toBeInTheDocument()
  })

  test('Не отображается, если не передать текст, иконку и значок', () => {
    const fakeStatus = 'status'
    render(<TaskStatus status={fakeStatus} />)

    const status = taskStatusTestUtils.queryContainer(fakeStatus)
    expect(status).not.toBeInTheDocument()
  })
})
