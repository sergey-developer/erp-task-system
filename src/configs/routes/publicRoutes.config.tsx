import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import PublicLayout from 'components/Layout/PublicLayout'

import { RoutesEnum } from './constants'

const LoginPage = React.lazy(() => import('modules/auth/pages/LoginPage'))

export default [
  {
    path: RoutesEnum.Root,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RoutesEnum.Login} />,
      },
      {
        path: RoutesEnum.Login,
        element: <LoginPage />,
      },
      {
        path: RoutesEnum.NotFound,
        element: <Navigate to={RoutesEnum.Login} replace />,
      },
    ],
  },
] as Array<RouteObject>
