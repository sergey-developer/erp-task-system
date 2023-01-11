import React from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'

import { RoutesEnum } from './constants'

const TaskMonitoringPage = React.lazy(
  () => import('modules/monitoring/pages/TaskMonitoringPage'),
)

export const staffRoutesConfig: Array<RouteObject> = [
  {
    path: RoutesEnum.Monitoring,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to={RoutesEnum.TaskMonitoring} />,
      },
      {
        path: RoutesEnum.TaskMonitoring,
        element: <TaskMonitoringPage />,
      },
    ],
  },
]
