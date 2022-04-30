import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import PublicLayout from 'components/Layout/PublicLayout'

import { RoutesEnum } from './constants'

const NotFound = React.lazy(() => import('components/NotFound'))

const SignInPage = React.lazy(() => import('modules/auth/SignInPage'))

const ForgotPasswordPage = React.lazy(
  () => import('modules/auth/ForgotPasswordPage'),
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
        element: <NotFound />,
      },
    ],
  },
] as RouteObject[]
