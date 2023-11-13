import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { CommonRouteEnum } from 'configs/routes'

import TaskListMapPage from 'modules/task/pages/TaskListMapPage'
import { testUtils as taskListMapPageTestUtils } from 'modules/task/pages/TaskListMapPage/TaskListMapPage.test'
import TaskListPage from 'modules/task/pages/TaskListPage'
import { testUtils as taskListPageTestUtils } from 'modules/task/pages/TaskListPage/TaskListPage.test'

import {
  mockGetTaskCountersSuccess,
  mockGetTaskListMapSuccess,
  mockGetTaskListSuccess,
} from '_tests_/mocks/api'
import { radioButtonTestUtils, renderInRoute_latest, setupApiTests } from '_tests_/utils'

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
      renderInRoute_latest([
        {
          path: CommonRouteEnum.Root,
          element: <TaskListLayout defaultRoute={CommonRouteEnum.DesktopTaskList} />,
        },
      ])

      const button = testUtils.getTaskListButton()

      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('value', CommonRouteEnum.DesktopTaskList)
    })

    test('При клике переходит на страницу реестра заявок', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()
      mockGetTaskListMapSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: CommonRouteEnum.DesktopTasks,
            element: <TaskListLayout defaultRoute={CommonRouteEnum.DesktopTaskListMap} />,
          },
          {
            path: CommonRouteEnum.DesktopTaskList,
            element: <TaskListPage />,
          },
          {
            path: CommonRouteEnum.DesktopTaskListMap,
            element: <TaskListMapPage />,
          },
        ],
        { initialEntries: [CommonRouteEnum.DesktopTasks], initialIndex: 0 },
      )

      await testUtils.clickTaskListButton(user)
      const page = taskListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Ссылка на карту', () => {
    test('Отображается корректно', () => {
      renderInRoute_latest([
        {
          path: CommonRouteEnum.Root,
          element: <TaskListLayout defaultRoute={CommonRouteEnum.DesktopTaskList} />,
        },
      ])

      const button = testUtils.getTaskListMapButton()

      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('value', CommonRouteEnum.DesktopTaskListMap)
    })

    test('При клике переходит на страницу карты с заявками', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()
      mockGetTaskListMapSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: CommonRouteEnum.DesktopTasks,
            element: <TaskListLayout defaultRoute={CommonRouteEnum.DesktopTaskList} />,
          },
          {
            path: CommonRouteEnum.DesktopTaskList,
            element: <TaskListPage />,
          },
          {
            path: CommonRouteEnum.DesktopTaskListMap,
            element: <TaskListMapPage />,
          },
        ],
        { initialEntries: [CommonRouteEnum.DesktopTasks], initialIndex: 0 },
      )

      await testUtils.clickTaskListMapButton(user)
      const page = taskListMapPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
