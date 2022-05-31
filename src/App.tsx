import './App.less'

import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { privateRoutesConfig, publicRoutesConfig } from 'configs/routes'
import useIsAuthenticated from 'modules/auth/hooks/useIsAuthenticated'

const App: FC = () => {
  const isAuthenticated = useIsAuthenticated()
  return useRoutes(isAuthenticated ? privateRoutesConfig : publicRoutesConfig)
}

export default App
