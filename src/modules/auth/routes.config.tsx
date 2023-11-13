import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import AuthLayout from 'modules/auth/components/AuthLayout'
import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
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
      element: (
        <ProtectedRoute
          component={<LoginPage />}
          reverseLoggedIn
          redirectPath={CommonRouteEnum.Home}
        />
      ),
    },
    {
      path: AuthRouteEnum.ChangePassword,
      element: <ProtectedRoute component={<ChangePasswordPage />} />,
    },
  ],
}
