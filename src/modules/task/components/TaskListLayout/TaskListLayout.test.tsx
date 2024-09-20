import React from 'react'

import { CommonRouteEnum } from 'configs/routes'

import { TasksRoutesEnum } from 'modules/task/constants/routes'
import TaskListMapPage from 'modules/task/pages/TaskListMapPage'
import TasksPage from 'modules/task/pages/TasksPage'

import { taskListLayoutTestUtils } from '_tests_/features/tasks/TaskListLayout/testUtils'
import { testUtils as taskListMapPageTestUtils } from '_tests_/features/tasks/TaskListMapPage/testUtils'
import { tasksPageTestUtils } from '_tests_/features/tasks/TasksPage/testUtils'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetTaskCountersSuccess,
  mockGetTaskListMapSuccess,
  mockGetTasksSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, renderWithRouter, setupApiTests } from '_tests_/utils'

import TaskListLayout from './index'

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

      await taskListLayoutTestUtils.clickTaskListButton(user)
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

      await taskListLayoutTestUtils.clickTaskListMapButton(user)
      const page = taskListMapPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
