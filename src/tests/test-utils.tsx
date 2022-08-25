/**
 * Описание настройки:
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 * https://testing-library.com/docs/example-react-router/#reducing-boilerplate
 */

import { ReactElement } from 'react'

import { RenderOptions, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppProvider from 'app/AppProvider'
import { RoutesEnum } from 'configs/routes'

const renderInAppProvider = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: AppProvider, ...options }),
})

const renderInRoute = (
  ui: ReactElement,
  route: RoutesEnum,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  window.history.pushState({}, '', route)
  return renderInAppProvider(ui, options)
}

export * from '@testing-library/react'
export { renderInAppProvider as render, renderInRoute }
