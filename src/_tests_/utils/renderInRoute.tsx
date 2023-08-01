/**
 * Описание настройки:
 * https://testing-library.com/docs/example-react-router/#reducing-boilerplate
 */
import isEqual from 'lodash/isEqual'
import { ReactElement } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import renderInAppProvider, {
  RenderInAppProviderOptions,
} from './renderInAppProvider'

const renderInRoute = (
  ui: ReactElement,
  route: RouteEnum,
  options?: RenderInAppProviderOptions,
) => {
  window.history.pushState({}, '', route)

  return {
    checkRouteChanged: (): boolean => !isEqual(window.location.pathname, route),
    getCurrentRoute: () => window.location.pathname,
    ...renderInAppProvider(ui, options),
  }
}

export const renderInRoute_latest = (
  routes: Parameters<typeof createMemoryRouter>[0],
  routerOptions?: Parameters<typeof createMemoryRouter>[1],
  renderOptions?: RenderInAppProviderOptions,
) => {
  const router = createMemoryRouter(routes, routerOptions)

  return {
    ...renderInAppProvider(<RouterProvider router={router} />, renderOptions),
  }
}

export default renderInRoute
