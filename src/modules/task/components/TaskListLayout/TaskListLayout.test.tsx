import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { RouteEnum } from 'configs/routes'

import TaskListMapPage from 'modules/task/pages/TaskListMapPage'
import { testUtils as taskListMapPageTestUtils } from 'modules/task/pages/TaskListMapPage/TaskListMapPage.test'
import TaskListPage from 'modules/task/pages/TaskListPage'
import { testUtils as taskListPageTestUtils } from 'modules/task/pages/TaskListPage/TaskListPage.test'

import { mockGetTaskCountersSuccess, mockGetTaskListMapSuccess, mockGetTaskListSuccess } from "_tests_/mocks/api";
import { renderInRoute_latest, setupApiTests } from '_tests_/utils'

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

const clickTaskListMapLink = async (user: UserEvent) => {
  const link = getTaskListMapLink()
  await user.click(link)
}

export const testUtils = {
  getContainer,

  getTaskListLink,
  clickTaskListLink,

  getTaskListMapLink,
  clickTaskListMapLink,
}

setupApiTests()

describe('TaskListLayout', () => {
  test('Отображает children', () => {
    const children = 'children'

    renderInRoute_latest([
      {
        path: RouteEnum.Root,
        element: <TaskListLayout>{children}</TaskListLayout>,
      },
    ])

    expect(within(getContainer()).getByText(children)).toBeInTheDocument()
  })

  describe('Ссылка на реестр', () => {
    test('Отображается корректно', () => {
      renderInRoute_latest([
        {
          path: RouteEnum.Root,
          element: <TaskListLayout>children</TaskListLayout>,
        },
      ])

      const link = testUtils.getTaskListLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', RouteEnum.TaskList)
    })

    test('При клике переходит на страницу реестра заявок', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()
      mockGetTaskListMapSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: RouteEnum.TaskList,
            element: <TaskListPage />,
          },
          {
            path: RouteEnum.TaskListMap,
            element: <TaskListMapPage />,
          },
        ],
        { initialEntries: [RouteEnum.TaskListMap], initialIndex: 1 },
      )

      await testUtils.clickTaskListLink(user)
      const page = taskListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Ссылка на карту', () => {
    test('Отображается корректно', () => {
      renderInRoute_latest([
        {
          path: RouteEnum.Root,
          element: <TaskListLayout>children</TaskListLayout>,
        },
      ])

      const link = testUtils.getTaskListMapLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', RouteEnum.TaskListMap)
    })

    test('При клике переходит на страницу карты с заявками', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()
      mockGetTaskListMapSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: RouteEnum.TaskList,
            element: <TaskListPage />,
          },
          {
            path: RouteEnum.TaskListMap,
            element: <TaskListMapPage />,
          },
        ],
        { initialEntries: [RouteEnum.TaskList], initialIndex: 0 },
      )

      await testUtils.clickTaskListMapLink(user)
      const page = taskListMapPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
