import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import PublicLayout from 'components/Layout/PublicLayout'

import { RoutesEnum } from './constants'

const SignInPage = React.lazy(
  () => import('modules/auth/components/SignIn/components/SignInPage'),
)

const ForgotPasswordPage = React.lazy(
  () =>
    import(
      'modules/auth/components/ForgotPassword/components/ForgotPasswordPage'
    ),
)

export default [
  {
    path: RoutesEnum.Root,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RoutesEnum.SignIn} />,
      },
      {
        path: RoutesEnum.SignIn,
        element: <SignInPage />,
      },
      {
        path: RoutesEnum.ForgotPassword,
        element: <ForgotPasswordPage />,
      },
      {
        path: RoutesEnum.NotFound,
        element: <Navigate to={RoutesEnum.SignIn} replace />,
      },
    ],
  },
] as Array<RouteObject>
