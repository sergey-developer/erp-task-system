import './App.less'

import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { privateRoutesConfig, publicRoutesConfig } from 'configs/routes'
import useAuth from 'modules/auth/hooks/useAuth'

const App: FC = () => {
  const { isAuthenticated } = useAuth()
  return useRoutes(isAuthenticated ? privateRoutesConfig : publicRoutesConfig)
}

export default App
