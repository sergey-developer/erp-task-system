import { getIconByName, render, screen } from '_tests_/utils'
import { TaskStatusEnum } from 'modules/task/constants/common'

import { badgeNameByTaskStatus, iconByTaskStatus } from './constants'
import TaskStatus from './index'

describe('TaskStatus', () => {
  describe('Получение иконки работает корректно для статуса', () => {
    test(`${TaskStatusEnum.Awaiting}`, () => {
      const icon = iconByTaskStatus[TaskStatusEnum.Awaiting]
      render(icon!)

      expect(getIconByName('pause-circle')).toBeInTheDocument()
    })

    test(`${TaskStatusEnum.InReclassification}`, () => {
      const icon = iconByTaskStatus[TaskStatusEnum.InReclassification]
      render(icon!)

      expect(getIconByName('question-circle')).toBeInTheDocument()
    })

    test(`${TaskStatusEnum.Returned}`, () => {
      const icon = iconByTaskStatus[TaskStatusEnum.Returned]
      render(icon!)

      expect(getIconByName('right-circle')).toBeInTheDocument()
    })

    test(`${TaskStatusEnum.Closed}`, () => {
      const icon = iconByTaskStatus[TaskStatusEnum.Closed]
      render(icon!)

      expect(getIconByName('check-circle')).toBeInTheDocument()
    })
  })

  describe('Получение названия значка работает корректно для статуса', () => {
    test(`${TaskStatusEnum.New}`, () => {
      const badgeName = badgeNameByTaskStatus[TaskStatusEnum.New]
      expect(badgeName).toBe('default')
    })

    test(`${TaskStatusEnum.Appointed}`, () => {
      const badgeName = badgeNameByTaskStatus[TaskStatusEnum.Appointed]
      expect(badgeName).toBe('default')
    })

    test(`${TaskStatusEnum.InProgress}`, () => {
      const badgeName = badgeNameByTaskStatus[TaskStatusEnum.InProgress]
      expect(badgeName).toBe('warning')
    })

    test(`${TaskStatusEnum.Completed}`, () => {
      const badgeName = badgeNameByTaskStatus[TaskStatusEnum.Completed]
      expect(badgeName).toBe('success')
    })
  })

  describe('Отображается для статуса', () => {
    test(`${TaskStatusEnum.New}`, () => {
      render(<TaskStatus status={TaskStatusEnum.New} />)

      const badge = screen.getByTestId('badge-status-default')
      expect(badge).toBeInTheDocument()
    })

    test(`${TaskStatusEnum.Appointed}`, () => {
      render(<TaskStatus status={TaskStatusEnum.Appointed} />)

      const badge = screen.getByTestId('badge-status-default')
      expect(badge).toBeInTheDocument()
    })

    test(`${TaskStatusEnum.InProgress}`, () => {
      render(<TaskStatus status={TaskStatusEnum.InProgress} />)

      const badge = screen.getByTestId('badge-status-warning')
      expect(badge).toBeInTheDocument()
    })

    test(`${TaskStatusEnum.Completed}`, () => {
      render(<TaskStatus status={TaskStatusEnum.Completed} />)

      const badge = screen.getByTestId('badge-status-success')
      expect(badge).toBeInTheDocument()
    })

    test(`${TaskStatusEnum.Awaiting}`, () => {
      render(<TaskStatus status={TaskStatusEnum.Awaiting} />)

      const icon = getIconByName('pause-circle')
      expect(icon).toBeInTheDocument()
    })

    test(`${TaskStatusEnum.InReclassification}`, () => {
      render(<TaskStatus status={TaskStatusEnum.InReclassification} />)

      const icon = getIconByName('question-circle')
      expect(icon).toBeInTheDocument()
    })

    test(`${TaskStatusEnum.Returned}`, () => {
      render(<TaskStatus status={TaskStatusEnum.Returned} />)

      const icon = getIconByName('right-circle')
      expect(icon).toBeInTheDocument()
    })

    test(`${TaskStatusEnum.Closed}`, () => {
      render(<TaskStatus status={TaskStatusEnum.Closed} />)

      const icon = getIconByName('check-circle')
      expect(icon).toBeInTheDocument()
    })
  })

  test('Текст отображается если он присутствует', () => {
    const text = 'text'
    render(<TaskStatus status={TaskStatusEnum.Closed} text={text} />)

    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
