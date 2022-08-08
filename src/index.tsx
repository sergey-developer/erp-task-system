import { ConfigProvider as AntdConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import ruRU from 'antd/lib/locale/ru_RU'
import ErrorBoundary from 'components/Error/ErrorBoundary'
import setupMoment from 'lib/moment/setup'
import store from 'state/store'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

setupMoment()

root.render(
  <StoreProvider store={store}>
    <AntdConfigProvider locale={ruRU}>
      <StyledThemeProvider theme={theme}>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </StyledThemeProvider>
    </AntdConfigProvider>
  </StoreProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
