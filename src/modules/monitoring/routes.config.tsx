import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

const TaskMonitoringPage = React.lazy(
  () => import('modules/monitoring/pages/TaskMonitoringPage'),
)

export const route: Readonly<RouteObject> = {
  path: RouteEnum.Monitoring,
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
}
