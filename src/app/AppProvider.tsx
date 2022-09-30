import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import ErrorBoundary from 'components/Error/ErrorBoundary'
import AntdConfigProvider from 'lib/antd/ConfigProvider'
import { FCWithChildren } from 'shared/interfaces/utils'
import appStore, { AppStore } from 'state/store'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import theme from 'styles/theme'

type AppProviderProps = {
  store?: AppStore
}

const AppProvider: FCWithChildren<AppProviderProps> = ({
  children,
  store = appStore,
}) => {
  return (
    <StoreProvider store={store}>
      <AntdConfigProvider>
        <StyledThemeProvider theme={theme}>
          <ErrorBoundary>
            <BrowserRouter>{children}</BrowserRouter>
          </ErrorBoundary>
        </StyledThemeProvider>
      </AntdConfigProvider>
    </StoreProvider>
  )
}

export default AppProvider
