import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import TaskListLayout from 'features/tasks/components/TaskListLayout'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { CommonRoutesEnum } from 'configs/routes'

import { TasksRoutesEnum } from './routes'

const TasksPage = React.lazy(() => import('features/tasks/pages/TasksPage'))
const TasksMapPage = React.lazy(() => import('features/tasks/pages/TasksMapPage'))

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
      element: <ProtectedRoute component={<TasksMapPage />} />,
    },
  ],
}
