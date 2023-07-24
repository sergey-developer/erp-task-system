import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { RouteEnum } from 'configs/routes'

import { render } from '_tests_/utils'

import TaskListLayout from './index'

const getContainer = () => screen.getByTestId('task-list-layout')

// task list link
const getTaskListLink = () =>
  within(getContainer()).getByRole('link', { name: 'Реестр' })

const clickTaskListLink = async (user: UserEvent) => {
  const link = getTaskListLink()
  await user.click(link)
}

// task list map link
const getTaskListMapLink = () =>
  within(getContainer()).getByRole('link', { name: 'Карта' })

const clickTaskMapListLink = async (user: UserEvent) => {
  const link = getTaskListMapLink()
  await user.click(link)
}

export const testUtils = {
  getContainer,

  getTaskListLink,
  clickTaskListLink,

  getTaskListMapLink,
  clickTaskMapListLink,
}

describe('TaskListLayout', () => {
  test('Отображает children', () => {
    const children = 'children'
    render(<TaskListLayout>{children}</TaskListLayout>)
    expect(within(getContainer()).getByText(children)).toBeInTheDocument()
  })

  describe('Ссылка на реестр', () => {
    test('Отображается корректно', () => {
      render(<TaskListLayout>children</TaskListLayout>)

      const link = testUtils.getTaskListLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', RouteEnum.TaskList)
    })

    test.todo('При клике переходит на страницу реестра заявок')
  })

  describe('Ссылка на карту', () => {
    test('Отображается корректно', () => {
      render(<TaskListLayout>children</TaskListLayout>)

      const link = testUtils.getTaskListMapLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', RouteEnum.TaskListMap)
    })

    test.todo('При клике переходит на страницу карты с заявками')
  })
})
