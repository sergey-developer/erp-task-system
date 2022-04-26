import React, { ComponentType } from 'react'
import PublicLayout from './components/Layout/PublicLayout';
import PrivateLayout from './components/Layout/PrivateLayout';

/** компоненты */
const SignInPage = React.lazy(() => import('./modules/auth/SignInPage'));
const ForgotPassword = React.lazy(() => import('./modules/auth/ForgotPasswordPage'));
const NotFound = React.lazy(() => import('./components/NotFound'));

export enum Routes {
  index = '/',
  signIn = '/signIn',
  forgotPassword = '/forgotPassword',
  recoveryPassword = '/recoveryPassword',
  notFound = '*',
}

export interface RouteConfig {
  name: Routes;
  key: Routes;
  path: string;
  element: ComponentType;
  layout: typeof PublicLayout | typeof PrivateLayout;
  default?: boolean;
}

export const publicRoutesConfig: RouteConfig[] = [
  {
    name: Routes.signIn,
    key: Routes.signIn,
    path: Routes.signIn,
    element: SignInPage,
    layout: PublicLayout,
    default: true,
  },
  {
    name: Routes.forgotPassword,
    key: Routes.forgotPassword,
    path: Routes.forgotPassword,
    element: ForgotPassword,
    layout: PublicLayout,
  },
  {
    name: Routes.notFound,
    key: Routes.notFound,
    path: Routes.notFound,
    element: NotFound,
    layout: PublicLayout,
  },
];

export const privateRoutesConfig: RouteConfig[] = [
  {
    name: Routes.notFound,
    key: Routes.notFound,
    path: Routes.notFound,
    element: NotFound,
    layout: PrivateLayout,
  },
];
