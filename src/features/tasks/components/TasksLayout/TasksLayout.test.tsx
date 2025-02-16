import TasksOnMapPage from 'features/tasks/pages/TasksOnMapPage'
import TasksPage from 'features/tasks/pages/TasksPage'
import { TasksRoutesEnum } from 'features/tasks/routes/routes'
import React from 'react'

import { CommonRoutesEnum } from 'configs/routes'

import { taskListLayoutTestUtils } from '_tests_/features/tasks/components/TasksLayout/testUtils'
import { testUtils as taskListMapPageTestUtils } from '_tests_/features/tasks/pages/TasksOnMapPage/testUtils'
import { tasksPageTestUtils } from '_tests_/features/tasks/pages/TasksPage/testUtils'
import userFixtures from '_tests_/fixtures/users'
import { getStoreWithAuth, renderWithRouter, setupApiTests } from '_tests_/helpers'
import {
  mockGetTaskCountersSuccess,
  mockGetTaskListMapSuccess,
  mockGetTasksSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

import TasksLayout from './index'

setupApiTests()

describe('TasksLayout', () => {
  describe('Ссылка на реестр', () => {
    test('Отображается корректно', () => {
      renderWithRouter([
        {
          path: CommonRoutesEnum.Root,
          element: <TasksLayout />,
        },
      ])

      const button = taskListLayoutTestUtils.getTaskListButton()

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
            path: CommonRoutesEnum.Desktop,
            element: <TasksLayout />,
          },
          {
            path: TasksRoutesEnum.DesktopTasks,
            element: <TasksPage />,
          },
          {
            path: TasksRoutesEnum.DesktopTasksMap,
            element: <TasksOnMapPage />,
          },
        ],
        { initialEntries: [CommonRoutesEnum.Desktop], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, null, null, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await taskListLayoutTestUtils.clickTaskListButton(user)
      const page = tasksPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Ссылка на карту', () => {
    test('Отображается корректно', () => {
      renderWithRouter([
        {
          path: CommonRoutesEnum.Root,
          element: <TasksLayout />,
        },
      ])

      const button = taskListLayoutTestUtils.getTaskListMapButton()

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
            path: CommonRoutesEnum.Desktop,
            element: <TasksLayout />,
          },
          {
            path: TasksRoutesEnum.DesktopTasks,
            element: <TasksPage />,
          },
          {
            path: TasksRoutesEnum.DesktopTasksMap,
            element: <TasksOnMapPage />,
          },
        ],
        { initialEntries: [CommonRoutesEnum.Desktop], initialIndex: 0 },
      )

      await taskListLayoutTestUtils.clickTaskListMapButton(user)
      const page = taskListMapPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
