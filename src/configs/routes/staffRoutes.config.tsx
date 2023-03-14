import React from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'

import { RouteEnum } from './constants'

const TaskMonitoringPage = React.lazy(
  () => import('modules/monitoring/pages/TaskMonitoringPage'),
)

export const staffRoutesConfig: Array<RouteObject> = [
  {
    path: RouteEnum.Monitoring,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to={RouteEnum.TaskMonitoring} />,
      },
      {
        path: RouteEnum.TaskMonitoring,
        element: <TaskMonitoringPage />,
      },
    ],
  },
]
