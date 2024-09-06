import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { CommonRouteEnum } from 'configs/routes'

import { TasksRoutesEnum } from 'modules/task/constants/routes'
import TaskListMapPage from 'modules/task/pages/TaskListMapPage'
import { testUtils as taskListMapPageTestUtils } from 'modules/task/pages/TaskListMapPage/TaskListMapPage.test'
import TasksPage from 'modules/task/pages/TasksPage'
import { testUtils as tasksPageTestUtils } from 'modules/task/pages/TasksPage/TasksPage.test'

import userFixtures from '_tests_/fixtures/user'
import {
  mockGetTaskCountersSuccess,
  mockGetTaskListMapSuccess,
  mockGetTasksSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  getStoreWithAuth,
  radioButtonTestUtils,
  renderWithRouter,
  setupApiTests,
} from '_tests_/utils'

import TaskListLayout from './index'

const getContainer = () => screen.getByTestId('task-list-layout')

// task list button
const getTaskListButton = () => radioButtonTestUtils.getRadioButtonIn(getContainer(), 'Реестр')
const clickTaskListButton = async (user: UserEvent) => {
  const button = getTaskListButton()
  await user.click(button)
}

// task list map button
const getTaskListMapButton = () => radioButtonTestUtils.getRadioButtonIn(getContainer(), 'Карта')
const clickTaskListMapButton = async (user: UserEvent) => {
  const button = getTaskListMapButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getTaskListButton,
  clickTaskListButton,

  getTaskListMapButton,
  clickTaskListMapButton,
}

setupApiTests()

describe('TaskListLayout', () => {
  describe('Ссылка на реестр', () => {
    test('Отображается корректно', () => {
      renderWithRouter([
        {
          path: CommonRouteEnum.Root,
          element: <TaskListLayout />,
        },
      ])

      const button = testUtils.getTaskListButton()

      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('value', TasksRoutesEnum.DesktopTasks)
    })

    test('При клике переходит на страницу реестра заявок', async () => {
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()
      mockGetTaskListMapSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: CommonRouteEnum.Desktop,
            element: <TaskListLayout />,
          },
          {
            path: TasksRoutesEnum.DesktopTasks,
            element: <TasksPage />,
          },
          {
            path: TasksRoutesEnum.DesktopTasksMap,
            element: <TaskListMapPage />,
          },
        ],
        { initialEntries: [CommonRouteEnum.Desktop], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, null, null, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.clickTaskListButton(user)
      const page = tasksPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Ссылка на карту', () => {
    test('Отображается корректно', () => {
      renderWithRouter([
        {
          path: CommonRouteEnum.Root,
          element: <TaskListLayout />,
        },
      ])

      const button = testUtils.getTaskListMapButton()

      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('value', TasksRoutesEnum.DesktopTasksMap)
    })

    test('При клике переходит на страницу карты с заявками', async () => {
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()
      mockGetTaskListMapSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: CommonRouteEnum.Desktop,
            element: <TaskListLayout />,
          },
          {
            path: TasksRoutesEnum.DesktopTasks,
            element: <TasksPage />,
          },
          {
            path: TasksRoutesEnum.DesktopTasksMap,
            element: <TaskListMapPage />,
          },
        ],
        { initialEntries: [CommonRouteEnum.Desktop], initialIndex: 0 },
      )

      await testUtils.clickTaskListMapButton(user)
      const page = taskListMapPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
