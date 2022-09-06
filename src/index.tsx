import React from 'react'
import ReactDOM from 'react-dom/client'

import App from 'app/App'
import AppProvider from 'app/AppProvider'

import reportWebVitals from './reportWebVitals'

const renderApp = () => {
  const rootElementId = 'root'
  const rootElement = document.getElementById(rootElementId)

  if (!rootElement)
    throw new Error(`Element by id - "${rootElementId}" was not found`)

  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <AppProvider>
      <App />
    </AppProvider>,
  )
}
console.log(123)
renderApp()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
