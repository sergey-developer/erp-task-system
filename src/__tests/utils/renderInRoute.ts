/**
 * Описание настройки:
 * https://testing-library.com/docs/example-react-router/#reducing-boilerplate
 */

import { ReactElement } from 'react'

import { RoutesEnum } from 'configs/routes'

import renderInAppProvider, {
  RenderInAppProviderOptions,
} from './renderInAppProvider'

const renderInRoute = (
  ui: ReactElement,
  route: RoutesEnum,
  options?: RenderInAppProviderOptions,
) => {
  window.history.pushState({}, '', route)

  return {
    checkRouteChanged: (): boolean => window.location.pathname !== route,
    ...renderInAppProvider(ui, options),
  }
}

export default renderInRoute
