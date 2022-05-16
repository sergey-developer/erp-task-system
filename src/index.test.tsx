import App from 'App'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import ErrorBoundary from 'components/ErrorBoundary'
import { ThemeProvider } from 'styled-components'

import store from './state/store'
import theme from './styles/theme'

it('Рендер приложения без краша', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </StoreProvider>,
    div,
  )
})
