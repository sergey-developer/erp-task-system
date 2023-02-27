/**
 * Описание настройки:
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
import { PreloadedState } from '@reduxjs/toolkit'
import { RenderOptions, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { AppStore, RootState, setupStore } from 'state/store'

import { FCWithChildren } from 'shared/interfaces/utils'

import AppProvider from 'app/AppProvider'

export type RenderInAppProviderOptions = Omit<RenderOptions, 'wrapper'> &
  Partial<{
    preloadedState: PreloadedState<RootState>
    store: AppStore
  }>

const renderInAppProvider = (
  ui: JSX.Element,
  {
    preloadedState = {},
    store = setupStore({ preloadedState }),
    ...renderOptions
  }: RenderInAppProviderOptions = {},
) => {
  const Wrapper: FCWithChildren = ({ children }) => {
    return <AppProvider store={store}>{children}</AppProvider>
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

export default renderInAppProvider
