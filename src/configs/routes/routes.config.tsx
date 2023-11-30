import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { route as authRoute } from 'modules/auth/routes.config'
import { route as fiscalAccumulatorRoute } from 'modules/fiscalAccumulator/routes.config'
import { route as monitoringRoute } from 'modules/monitoring/routes.config'
import { route as taskRoute } from 'modules/task/routes.config'
import { route as warehouseRoute } from 'modules/warehouse/routes.config'

import ErrorBoundary from 'components/ErrorBoundary'
import HomeLayout from 'components/Layouts/HomeLayout'

import { CommonRouteEnum } from './constants'

export const routes: RouteObject[] = [
  {
    path: CommonRouteEnum.Root,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={CommonRouteEnum.Home} />,
      },

      authRoute,

      {
        path: CommonRouteEnum.Home,
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={CommonRouteEnum.DesktopTaskList} />,
          },
          taskRoute,
          fiscalAccumulatorRoute,
          warehouseRoute,
          monitoringRoute,
        ],
      },
    ],
  },
]
