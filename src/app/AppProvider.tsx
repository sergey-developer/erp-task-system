import { ConfigProvider as AntdConfigProvider } from 'antd'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import ruRU from 'antd/lib/locale/ru_RU'
import ErrorBoundary from 'components/Error/ErrorBoundary'
import { FCWithChildren } from 'shared/interfaces/utils'
import store from 'state/store'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import theme from 'styles/theme'

const AppProvider: FCWithChildren = ({ children }) => {
  return (
    <StoreProvider store={store}>
      <AntdConfigProvider locale={ruRU}>
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
