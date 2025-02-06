import { authRoutes } from 'features/auth/routes/routes.config'
import { infrastructuresRoutes } from 'features/infrastructures/routes/routes.config'
import HomeLayout from 'features/layout/components/HomeLayout'
import { monitoringRoutes } from 'features/monitoring/routes.config'
import { reportsRoutes } from 'features/reports/routes.config'
import { TasksRoutesEnum } from 'features/task/constants/routes'
import { tasksRoutes } from 'features/task/routes.config'
import { warehousesRoutes } from 'features/warehouse/routes.config'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import ErrorBoundary from 'components/ErrorBoundary'

import { CommonRoutesEnum } from './constants'

export const routes: RouteObject[] = [
  {
    path: CommonRoutesEnum.Root,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={CommonRoutesEnum.Home} />,
      },

      authRoutes,

      {
        path: CommonRoutesEnum.Home,
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={TasksRoutesEnum.DesktopTasks} />,
          },
          tasksRoutes,
          warehousesRoutes,
          monitoringRoutes,
          reportsRoutes,
          infrastructuresRoutes,
        ],
      },
    ],
  },
]
