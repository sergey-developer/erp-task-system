import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { route as fiscalAccumulatorRoute } from 'modules/fiscalAccumulator/routes.config'
import { route as monitoringRoute } from 'modules/monitoring/routes.config'
import { route as taskRoute } from 'modules/task/routes.config'
import { UserModel } from 'modules/user/models'
import { route as manageWarehousesRoute } from 'modules/warehouse/routes.config'

import PrivateLayout from 'components/Layouts/PrivateLayout'
import NotFoundPage from 'components/Pages/NotFoundPage'

import { RouteEnum } from './constants'

const ChangePasswordPage = React.lazy(() => import('modules/auth/pages/ChangePasswordPage'))

// todo: разделить роуты по модулям

export const getPrivateRoutesConfig = ({ isStaff }: Pick<UserModel, 'isStaff'>): RouteObject[] => [
  {
    path: RouteEnum.Root,
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RouteEnum.TaskList} />,
      },
      taskRoute,

      fiscalAccumulatorRoute,

      manageWarehousesRoute,

      ...(isStaff ? [monitoringRoute] : []),
      {
        path: RouteEnum.ChangePassword,
        element: <ChangePasswordPage />,
      },
      {
        path: RouteEnum.NotFound,
        element: <NotFoundPage />,
      },
    ],
  },
]
