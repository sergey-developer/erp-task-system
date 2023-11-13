import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { MonitoringRouteEnum } from 'modules/monitoring/constants'

import AllowedRoute from 'components/AllowedRoute'

const TaskMonitoringPage = React.lazy(() => import('modules/monitoring/pages/TaskMonitoringPage'))

export const route: Readonly<RouteObject> = {
  path: MonitoringRouteEnum.Monitoring,
  children: [
    {
      index: true,
      element: <Navigate to={MonitoringRouteEnum.TaskMonitoring} />,
    },
    {
      path: MonitoringRouteEnum.TaskMonitoring,
      element: <AllowedRoute component={<TaskMonitoringPage />} allowed={(user) => user.isStaff} />,
    },
  ],
}
