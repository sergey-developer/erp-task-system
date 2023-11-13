import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import AuthLayout from 'modules/auth/components/AuthLayout'
import { AuthRouteEnum } from 'modules/auth/constants/routes'

const LoginPage = React.lazy(() => import('modules/auth/pages/LoginPage'))
const ChangePasswordPage = React.lazy(() => import('modules/auth/pages/ChangePasswordPage'))

export const route: Readonly<RouteObject> = {
  path: AuthRouteEnum.Auth,
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={AuthRouteEnum.Login} />,
    },
    {
      path: AuthRouteEnum.Login,
      element: <LoginPage />,
    },
    {
      path: AuthRouteEnum.ChangePassword,
      element: <ChangePasswordPage />,
    },
  ],
}
