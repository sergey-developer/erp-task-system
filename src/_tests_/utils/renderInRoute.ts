/**
 * Описание настройки:
 * https://testing-library.com/docs/example-react-router/#reducing-boilerplate
 */

import { ReactElement } from 'react'

import { RoutesEnum } from 'configs/routes'
import { isEqual } from 'shared/utils/common/isEqual'

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
    checkRouteChanged: (): boolean => !isEqual(window.location.pathname, route),
    ...renderInAppProvider(ui, options),
  }
}

export default renderInRoute
