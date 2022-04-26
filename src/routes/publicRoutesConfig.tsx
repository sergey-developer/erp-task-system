import NotFound from '../components/NotFound';
import { Routes } from './constants'
import { RouteConfig } from './interfaces'
import SignInPage from '../modules/auth/SignInPage'
import PublicLayout from '../components/Layout/PublicLayout'
import ForgotPassword from '../modules/auth/ForgotPasswordPage'

export default [
  {
    path: Routes.signIn,
    element: SignInPage,
    layout: PublicLayout,
    index: true,
  },
  {
    path: Routes.forgotPassword,
    element: ForgotPassword,
    layout: PublicLayout,
  },
  {
    path: Routes.notFound,
    element: NotFound,
    layout: PublicLayout,
  },
] as RouteConfig[];
