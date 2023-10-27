import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { RouteEnum } from 'configs/routes'

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
          path: RouteEnum.Root,
          element: <TaskListLayout defaultRoute={RouteEnum.TaskList} />,
        },
      ])

      const button = testUtils.getTaskListButton()

      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('value', RouteEnum.TaskList)
    })

    test('При клике переходит на страницу реестра заявок', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()
      mockGetTaskListMapSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: RouteEnum.Tasks,
            element: <TaskListLayout defaultRoute={RouteEnum.TaskListMap} />,
          },
          {
            path: RouteEnum.TaskList,
            element: <TaskListPage />,
          },
          {
            path: RouteEnum.TaskListMap,
            element: <TaskListMapPage />,
          },
        ],
        { initialEntries: [RouteEnum.Tasks], initialIndex: 0 },
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
          path: RouteEnum.Root,
          element: <TaskListLayout defaultRoute={RouteEnum.TaskList} />,
        },
      ])

      const button = testUtils.getTaskListMapButton()

      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('value', RouteEnum.TaskListMap)
    })

    test('При клике переходит на страницу карты с заявками', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()
      mockGetTaskListMapSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: RouteEnum.Tasks,
            element: <TaskListLayout defaultRoute={RouteEnum.TaskList} />,
          },
          {
            path: RouteEnum.TaskList,
            element: <TaskListPage />,
          },
          {
            path: RouteEnum.TaskListMap,
            element: <TaskListMapPage />,
          },
        ],
        { initialEntries: [RouteEnum.Tasks], initialIndex: 0 },
      )

      await testUtils.clickTaskListMapButton(user)
      const page = taskListMapPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
