import { render, screen } from '_tests_/utils'
import { TaskExtraStatusEnum } from 'modules/task/constants/common'

import { badgeNameByTaskExtraStatus } from '../constants'
import TaskExtraStatus from '../TaskExtraStatus'

const statusText = 'text'

describe('TaskExtraStatus', () => {
  describe('Получение названия значка работает корректно для статуса', () => {
    test(`${TaskExtraStatusEnum.Assigned}`, () => {
      const badgeName = badgeNameByTaskExtraStatus[TaskExtraStatusEnum.Assigned]
      expect(badgeName).toBe('default')
    })

    test(`${TaskExtraStatusEnum.NotAssigned}`, () => {
      const badgeName =
        badgeNameByTaskExtraStatus[TaskExtraStatusEnum.NotAssigned]

      expect(badgeName).toBe('default')
    })
  })

  describe('Отображается для статуса', () => {
    test(`${TaskExtraStatusEnum.Assigned}`, () => {
      render(
        <TaskExtraStatus
          status={TaskExtraStatusEnum.Assigned}
          text={statusText}
        />,
      )

      const badge = screen.getByTestId('badge-status-default')
      expect(badge).toBeInTheDocument()
    })

    test(`${TaskExtraStatusEnum.NotAssigned}`, () => {
      render(
        <TaskExtraStatus
          status={TaskExtraStatusEnum.NotAssigned}
          text={statusText}
        />,
      )

      const badge = screen.getByTestId('badge-status-default')
      expect(badge).toBeInTheDocument()
    })
  })

  test('Отображает текст', () => {
    render(
      <TaskExtraStatus
        status={TaskExtraStatusEnum.Assigned}
        text={statusText}
      />,
    )

    expect(screen.getByText(statusText)).toBeInTheDocument()
  })
})
