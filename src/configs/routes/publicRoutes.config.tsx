import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import PublicLayout from 'components/Layouts/PublicLayout'

import { RouteEnum } from './constants'

const LoginPage = React.lazy(() => import('modules/auth/pages/LoginPage'))

export const publicRoutesConfig: RouteObject[] = [
  {
    path: RouteEnum.Root,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RouteEnum.Login} />,
      },
      {
        path: RouteEnum.Login,
        element: <LoginPage />,
      },
      {
        path: RouteEnum.NotFound,
        element: <Navigate to={RouteEnum.Login} replace />,
      },
    ],
  },
]
