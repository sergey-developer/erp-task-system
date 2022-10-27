import { getIconByName, render } from '_tests_/utils'
import { screen } from '@testing-library/react'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import {
  badgeByTaskExtendedStatus,
  badgeByTaskStatus,
  iconByTaskExtendedStatus,
} from './constants'
import TaskStatus from './index'

describe('Получение названия значка работает корректно по статусу заявки', () => {
  test(`${TaskStatusEnum.New}`, () => {
    const badgeName = badgeByTaskStatus[TaskStatusEnum.New]
    expect(badgeName).toBe('default')
  })

  test(`${TaskStatusEnum.InProgress}`, () => {
    const badgeName = badgeByTaskStatus[TaskStatusEnum.InProgress]
    expect(badgeName).toBe('warning')
  })

  test(`${TaskStatusEnum.Completed}`, () => {
    const badgeName = badgeByTaskStatus[TaskStatusEnum.Completed]
    expect(badgeName).toBe('success')
  })
})

describe('Получение названия значка работает корректно по расширенному статусу заявки', () => {
  test(`${TaskExtendedStatusEnum.New}`, () => {
    const badgeName = badgeByTaskExtendedStatus[TaskExtendedStatusEnum.New]
    expect(badgeName).toBe('default')
  })

  test(`${TaskExtendedStatusEnum.InProgress}`, () => {
    const badgeName =
      badgeByTaskExtendedStatus[TaskExtendedStatusEnum.InProgress]
    expect(badgeName).toBe('warning')
  })

  test(`${TaskExtendedStatusEnum.Completed}`, () => {
    const badgeName =
      badgeByTaskExtendedStatus[TaskExtendedStatusEnum.Completed]
    expect(badgeName).toBe('success')
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
        badge={badgeByTaskExtendedStatus[TaskExtendedStatusEnum.Completed]}
      />,
    )

    const badge = screen.getByTestId('badge-status-success')
    expect(badge).toBeInTheDocument()
  })

  test('Отображает иконку', () => {
    render(
      <TaskStatus
        icon={iconByTaskExtendedStatus[TaskExtendedStatusEnum.Awaiting]}
      />,
    )

    expect(getIconByName('pause-circle')).toBeInTheDocument()
  })

  test('Отображается текст', () => {
    const text = 'text'
    render(<TaskStatus text={text} />)

    expect(screen.getByText(text)).toBeInTheDocument()
  })

  test('Если передать название значка и иконку, отображает только иконку', () => {
    render(
      <TaskStatus
        icon={iconByTaskExtendedStatus[TaskExtendedStatusEnum.Awaiting]}
        badge={badgeByTaskExtendedStatus[TaskExtendedStatusEnum.Completed]}
      />,
    )

    const icon = getIconByName('pause-circle')
    const badge = screen.queryByTestId('badge-status-success')

    expect(icon).toBeInTheDocument()
    expect(badge).not.toBeInTheDocument()
  })

  test('Не отображается, если не передать текст, иконку и название значка', () => {
    render(<TaskStatus />)

    const status = screen.queryByTestId('task-status')
    expect(status).not.toBeInTheDocument()
  })
})
