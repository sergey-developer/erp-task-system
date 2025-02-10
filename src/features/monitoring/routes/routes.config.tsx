import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import { MonitoringRoutesEnum } from 'features/monitoring/constants'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const TaskMonitoringPage = React.lazy(() => import('features/monitoring/pages/TaskMonitoringPage'))

export const monitoringRoutes: Readonly<RouteObject> = {
  path: MonitoringRoutesEnum.Monitoring,
  children: [
    {
      index: true,
      element: <Navigate to={MonitoringRoutesEnum.TaskMonitoring} />,
    },
    {
      path: MonitoringRoutesEnum.TaskMonitoring,
      element: (
        <ProtectedRoute component={<TaskMonitoringPage />} permitted={(user) => user.isStaff} />
      ),
    },
  ],
}
