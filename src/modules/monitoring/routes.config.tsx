import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import { MonitoringRouteEnum } from 'modules/monitoring/constants'

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
      element: (
        <ProtectedRoute component={<TaskMonitoringPage />} permitted={(user) => user.isStaff} />
      ),
    },
  ],
}
