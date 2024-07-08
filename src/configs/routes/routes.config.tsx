import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { route as authRoute } from 'modules/auth/routes.config'
import { infrastructuresRoute } from 'modules/infrastructures/routes.config'
import { route as monitoringRoute } from 'modules/monitoring/routes.config'
import { route as reportsRoute } from 'modules/reports/routes.config'
import { TasksRoutesEnum } from 'modules/task/constants/routes'
import { route as tasksRoute } from 'modules/task/routes.config'
import { route as warehousesRoute } from 'modules/warehouse/routes.config'

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
            element: <Navigate to={TasksRoutesEnum.DesktopTasks} />,
          },
          tasksRoute,
          warehousesRoute,
          monitoringRoute,
          reportsRoute,
          infrastructuresRoute,
        ],
      },
    ],
  },
]
