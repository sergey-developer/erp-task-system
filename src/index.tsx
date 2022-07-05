import 'moment/locale/ru'

import { ConfigProvider } from 'antd'
import moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import ruRU from 'antd/lib/locale/ru_RU'
import ErrorBoundary from 'components/ErrorBoundary'
import store from 'state/store'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

moment.locale('ru')

root.render(
  <StoreProvider store={store}>
    <ConfigProvider locale={ruRU}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </ConfigProvider>
  </StoreProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
