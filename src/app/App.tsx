import 'styles/index.less'

import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { privateRoutesConfig, publicRoutesConfig } from 'configs/routes'
import setupAntd from 'lib/antd/setup'
import setupMoment from 'lib/moment/setup'
import useIsAuthenticated from 'modules/auth/hooks/useIsAuthenticated'

setupMoment()
setupAntd()

const App: FC = () => {
  const isAuthenticated = useIsAuthenticated()
  return useRoutes(isAuthenticated ? privateRoutesConfig : publicRoutesConfig)
}

export default App
