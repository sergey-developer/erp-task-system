import AuthLayout from 'features/auth/components/AuthLayout'
import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import { AuthRoutesEnum } from 'features/auth/routes/routes'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const LoginPage = React.lazy(() => import('features/auth/pages/LoginPage'))
const ChangePasswordPage = React.lazy(() => import('features/auth/pages/ChangePasswordPage'))

export const authRoutes: Readonly<RouteObject> = {
  path: AuthRoutesEnum.Root,
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={AuthRoutesEnum.Login} />,
    },
    {
      path: AuthRoutesEnum.Login,
      element: <ProtectedRoute component={<LoginPage />} onlyGuest />,
    },
    {
      path: AuthRoutesEnum.ChangePassword,
      element: <ProtectedRoute component={<ChangePasswordPage />} />,
    },
  ],
}
