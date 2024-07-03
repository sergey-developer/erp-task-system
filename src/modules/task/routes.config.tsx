import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import TaskListLayout from 'modules/task/components/TaskListLayout'

import { TasksRoutesEnum } from './constants/routes'

const TasksPage = React.lazy(() => import('modules/task/pages/TasksPage'))
const TaskListMapPage = React.lazy(() => import('modules/task/pages/TaskListMapPage'))

export const route: Readonly<RouteObject> = {
  path: CommonRouteEnum.Desktop,
  element: <TaskListLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={TasksRoutesEnum.DesktopTasks} />,
    },
    {
      path: TasksRoutesEnum.DesktopTasks,
      element: <ProtectedRoute component={<TasksPage />} />,
    },
    {
      path: TasksRoutesEnum.DesktopTasksMap,
      element: <ProtectedRoute component={<TaskListMapPage />} />,
    },
  ],
}
