/**
 * Описание настройки:
 * https://testing-library.com/docs/example-react-router/#reducing-boilerplate
 */

import { ReactElement } from 'react'

import { RenderOptions } from '@testing-library/react'
import { RoutesEnum } from 'configs/routes'

import renderInAppProvider from './renderInAppProvider'

const renderInRoute = (
  ui: ReactElement,
  route: RoutesEnum,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  window.history.pushState({}, '', route)

  return {
    checkRouteChanged: (): boolean => window.location.pathname !== route,
    ...renderInAppProvider(ui, options),
  }
}

export default renderInRoute
