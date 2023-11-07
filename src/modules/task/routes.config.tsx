import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import TaskListLayout from './components/TaskListLayout'

const TaskListPage = React.lazy(() => import('modules/task/pages/TaskListPage'))
const TaskListMapPage = React.lazy(() => import('modules/task/pages/TaskListMapPage'))

export const route: Readonly<RouteObject> = {
  path: RouteEnum.Tasks,
  element: <TaskListLayout defaultRoute={RouteEnum.TaskList} />,
  children: [
    {
      index: true,
      element: <Navigate to={RouteEnum.TaskList} />,
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
}
