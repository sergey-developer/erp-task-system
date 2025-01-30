import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import { MonitoringRouteEnum } from 'features/monitoring/constants'

const TaskMonitoringPage = React.lazy(() => import('features/monitoring/pages/TaskMonitoringPage'))

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
