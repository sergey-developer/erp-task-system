import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import TaskListLayout from 'modules/task/components/TaskListLayout'

import { TasksRoutesEnum } from './constants/routes'

const TaskListPage = React.lazy(() => import('modules/task/pages/TaskListPage'))
const TaskListMapPage = React.lazy(() => import('modules/task/pages/TaskListMapPage'))

export const route: Readonly<RouteObject> = {
  path: TasksRoutesEnum.DesktopTasks,
  element: <TaskListLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={TasksRoutesEnum.DesktopTaskList} />,
    },
    {
      path: TasksRoutesEnum.DesktopTaskList,
      element: <ProtectedRoute component={<TaskListPage />} />,
    },
    {
      path: TasksRoutesEnum.DesktopTaskListMap,
      element: <ProtectedRoute component={<TaskListMapPage />} />,
    },
  ],
}
