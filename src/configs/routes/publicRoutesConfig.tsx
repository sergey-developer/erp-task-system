import PublicLayout from 'components/Layout/PublicLayout'
import NotFound from 'components/NotFound'
import ForgotPasswordPage from 'modules/auth/ForgotPasswordPage'
import SignInPagePage from 'modules/auth/SignInPage'

import { RoutesEnum } from './constants'
import { RouteConfig } from './interfaces'

export default [
  {
    path: RoutesEnum.SignIn,
    element: SignInPagePage,
    layout: PublicLayout,
    index: true,
  },
  {
    path: RoutesEnum.ForgotPassword,
    element: ForgotPasswordPage,
    layout: PublicLayout,
  },
  {
    path: RoutesEnum.NotFound,
    element: NotFound,
    layout: PublicLayout,
  },
] as RouteConfig[]
