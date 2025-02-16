import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import TasksLayout from 'features/tasks/components/TasksLayout'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { CommonRoutesEnum } from 'configs/routes'

import { TasksRoutesEnum } from './routes'

const TasksPage = React.lazy(() => import('features/tasks/pages/TasksPage'))
const TasksOnMapPage = React.lazy(() => import('features/tasks/pages/TasksOnMapPage'))

export const tasksRoutes: Readonly<RouteObject> = {
  path: CommonRoutesEnum.Desktop,
  element: <TasksLayout />,
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
      element: <ProtectedRoute component={<TasksOnMapPage />} />,
    },
  ],
}
