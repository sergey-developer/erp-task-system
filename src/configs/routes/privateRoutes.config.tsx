import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import PrivateLayout from 'components/Layout/PrivateLayout'
import { taskListDefaultRoute } from 'modules/tasks/taskList/components/TaskListPage/constants'

import { RoutesEnum } from './constants'

const NotFound = React.lazy(() => import('components/NotFound'))

const TaskListPage = React.lazy(
  () => import('modules/tasks/taskList/components/TaskListPage'),
)

export default [
  {
    path: RoutesEnum.Root,
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={taskListDefaultRoute} />,
      },
      {
        path: RoutesEnum.TaskList,
        element: <TaskListPage />,
      },
      {
        path: RoutesEnum.NotFound,
        element: <NotFound />,
      },
    ],
  },
] as Array<RouteObject>
