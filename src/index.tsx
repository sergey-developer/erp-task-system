import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'

import App from 'app/App'
import ErrorBoundary from 'components/ErrorBoundary'
import store from 'state/store'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  </StoreProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
