/**
 * Описание настройки:
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
import { PreloadedState } from '@reduxjs/toolkit'
import { render as baseRender, RenderOptions as BaseRenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import isEqual from 'lodash/isEqual'
import React, { ReactElement } from 'react'
import { BrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom'

import { AppStore, RootState, setupStore } from 'state/store'

import { FCWithChildren } from 'shared/types/utils'

import AppProvider from 'app/AppProvider'

export type RenderOptions = Omit<BaseRenderOptions, 'wrapper'> &
  Partial<{
    preloadedState: PreloadedState<RootState>
    store: AppStore
    useBrowserRouter: boolean
  }>

export const render = (
  component: JSX.Element,
  {
    preloadedState = {},
    store = setupStore({ preloadedState }),
    useBrowserRouter = true,
    ...renderOptions
  }: RenderOptions = {},
) => {
  const Wrapper: FCWithChildren = ({ children }) => {
    return (
      <AppProvider store={store}>
        {useBrowserRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
      </AppProvider>
    )
  }

  return {
    user: userEvent.setup(),
    ...baseRender(component, { wrapper: Wrapper, ...renderOptions }),
  }
}

export const renderInRoute = (component: ReactElement, route: string, options?: RenderOptions) => {
  window.history.pushState({}, '', route)

  return {
    checkRouteChanged: (): boolean => !isEqual(window.location.pathname, route),
    getCurrentRoute: () => window.location.pathname,
    ...render(component, options),
  }
}

// todo: использовать вместо renderInRoute
export const renderWithRouter = (
  routes: Parameters<typeof createMemoryRouter>[0],
  routerOptions?: Parameters<typeof createMemoryRouter>[1],
  renderOptions: RenderOptions = {},
) => {
  const router = createMemoryRouter(routes, routerOptions)

  return {
    ...render(<RouterProvider router={router} />, {
      ...renderOptions,
      useBrowserRouter: false,
    }),
  }
}
