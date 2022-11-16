/**
 * Описание настройки:
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 */

import { PreloadedState } from '@reduxjs/toolkit'
import React, { ReactElement } from 'react'

import { RenderOptions, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppProvider from 'app/AppProvider'
import { FCWithChildren } from 'shared/interfaces/utils'
import { AppStore, RootState, setupStore } from 'state/store'

export type RenderInAppProviderOptions = Omit<RenderOptions, 'wrapper'> &
  Partial<{
    preloadedState: PreloadedState<RootState>
    store: AppStore
  }>

const renderInAppProvider = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore({ preloadedState }),
    ...renderOptions
  }: RenderInAppProviderOptions = {},
) => {
  const Wrapper: FCWithChildren = ({ children }) => {
    return (
      <React.StrictMode>
        <AppProvider store={store}>{children}</AppProvider>
      </React.StrictMode>
    )
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

export default renderInAppProvider
