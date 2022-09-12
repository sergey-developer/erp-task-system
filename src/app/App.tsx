import 'styles/index.less'

import { Spin } from 'antd'
import React, { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { LoadingIcon } from 'components/Icons'
import { privateRoutesConfig, publicRoutesConfig } from 'configs/routes'
import setupMoment from 'lib/moment/setup'
import useIsAuthenticated from 'modules/auth/hooks/useIsAuthenticated'

setupMoment()
Spin.setDefaultIndicator(<LoadingIcon />)

const App: FC = () => {
  const isAuthenticated = useIsAuthenticated()
  return useRoutes(isAuthenticated ? privateRoutesConfig : publicRoutesConfig)
}

export default App
