import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import AuthLayout from 'features/auth/components/AuthLayout'
import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import { AuthRouteEnum } from 'features/auth/constants/routes'

const LoginPage = React.lazy(() => import('features/auth/pages/LoginPage'))
const ChangePasswordPage = React.lazy(() => import('features/auth/pages/ChangePasswordPage'))

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
      element: <ProtectedRoute component={<LoginPage />} onlyGuest />,
    },
    {
      path: AuthRouteEnum.ChangePassword,
      element: <ProtectedRoute component={<ChangePasswordPage />} />,
    },
  ],
}
