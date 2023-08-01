import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { routes as staffRoutes } from 'modules/monitoring/routes'
import { routes as taskRoutes } from 'modules/task/routes'
import { UserModel } from 'modules/user/models'

import PrivateLayout from 'components/Layouts/PrivateLayout'
import NotFoundPage from 'components/Pages/NotFoundPage'

import { RouteEnum } from './constants'

const ChangePasswordPage = React.lazy(
  () => import('modules/auth/pages/ChangePasswordPage'),
)

export const getPrivateRoutesConfig = ({
  isStaff,
}: Pick<UserModel, 'isStaff'>): Array<RouteObject> => [
  {
    path: RouteEnum.Root,
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RouteEnum.TaskList} />,
      },
      ...taskRoutes,
      {
        path: RouteEnum.ChangePassword,
        element: <ChangePasswordPage />,
      },
      ...(isStaff ? staffRoutes : []),
      {
        path: RouteEnum.NotFound,
        element: <NotFoundPage />,
      },
    ],
  },
]
