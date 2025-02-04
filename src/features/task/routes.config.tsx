import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import TaskListLayout from 'features/task/components/TaskListLayout'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { CommonRoutesEnum } from 'configs/routes'

import { TasksRoutesEnum } from './constants/routes'

const TasksPage = React.lazy(() => import('features/task/pages/TasksPage'))
const TaskListMapPage = React.lazy(() => import('features/task/pages/TaskListMapPage'))

export const tasksRoutes: Readonly<RouteObject> = {
  path: CommonRoutesEnum.Desktop,
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
