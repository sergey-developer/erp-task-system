import { App } from 'antd'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { AppStore, store as appStore } from 'store/store'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import AntdConfigProvider from 'lib/antd/ConfigProvider'
import setupMoment from 'lib/moment/setup'

import { FCWithChildren } from 'shared/types/utils'

import theme from 'styles/theme'

setupMoment()

type AppProviderProps = {
  store?: AppStore
}

const AppProvider: FCWithChildren<AppProviderProps> = ({ children, store = appStore }) => {
  return (
    <App>
      <StoreProvider store={store}>
        <AntdConfigProvider>
          <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </AntdConfigProvider>
      </StoreProvider>
    </App>
  )
}

export default AppProvider
