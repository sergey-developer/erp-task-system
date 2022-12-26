import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import PrivateLayout from 'components/Layout/PrivateLayout'

import { RoutesEnum } from './constants'

const NotFound = React.lazy(() => import('components/NotFound'))

const TaskListPage = React.lazy(() => import('modules/task/pages/TaskListPage'))

const TaskMonitoringPage = React.lazy(
  () => import('modules/monitoring/pages/TaskMonitoringPage'),
)

export default [
  {
    path: RoutesEnum.Root,
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RoutesEnum.TaskList} />,
      },
      {
        path: RoutesEnum.TaskList,
        element: <TaskListPage />,
      },
      {
        path: RoutesEnum.TaskMonitoring,
        element: <TaskMonitoringPage />,
      },
      {
        path: RoutesEnum.NotFound,
        element: <NotFound />,
      },
    ],
  },
] as Array<RouteObject>
