import { getIconByName, render, screen } from '_tests_/utils'

import { FastFilterEnum } from '../../TaskList/constants/common'
import { iconByFilter } from '../constants'
import TaskFilterStatus from '../TaskFilterStatus'

const statusText = 'text'

describe('TaskFilterStatus', () => {
  describe('Получение иконки работает корректно по фильтру', () => {
    test(`${FastFilterEnum.Overdue}`, () => {
      const icon = iconByFilter[FastFilterEnum.Overdue]
      render(icon)

      expect(getIconByName('history')).toBeInTheDocument()
    })
  })

  describe('Отображается для статуса', () => {
    test(`${FastFilterEnum.Overdue}`, () => {
      render(
        <TaskFilterStatus status={FastFilterEnum.Overdue} text={statusText} />,
      )

      const icon = getIconByName('history')
      expect(icon).toBeInTheDocument()
    })
  })

  test('Отображает текст', () => {
    render(
      <TaskFilterStatus status={FastFilterEnum.Overdue} text={statusText} />,
    )

    const text = screen.getByText(statusText)
    expect(text).toBeInTheDocument()
  })
})
