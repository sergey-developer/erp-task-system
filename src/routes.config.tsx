import React, { ComponentType } from 'react'
import PublicLayout from './components/Layout/PublicLayout';
import PrivateLayout from './components/Layout/PrivateLayout';

/** компоненты */
const SignInPage = React.lazy(() => import('./Pages/SignIn'));
const ForgotPassword = React.lazy(() => import('./Pages/ForgotPassword'));
const NotFound = React.lazy(() => import('./Pages/NotFound'));

const SomePrivatePage = React.lazy(() => import('./Pages/SomePrivatePage'));


export enum Routes {
  index = '/',
  signIn = 'signIn',
  forgotPassword = 'forgotPassword',
  recoveryPassword = 'recoveryPassword',
  somePrivatePage = 'somePrivatePage',
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
    name: Routes.somePrivatePage,
    key: Routes.somePrivatePage,
    path: Routes.somePrivatePage,
    element: SomePrivatePage,
    layout: PrivateLayout,
    default: true,
  },
  {
    name: Routes.notFound,
    key: Routes.notFound,
    path: Routes.notFound,
    element: NotFound,
    layout: PrivateLayout,
  },
];
