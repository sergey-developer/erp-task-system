import 'styles/index.less'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React, { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { privateRoutesConfig, publicRoutesConfig } from 'configs/routes'
import setupMoment from 'lib/moment/setup'
import useIsAuthenticated from 'modules/auth/hooks/useIsAuthenticated'

setupMoment()
Spin.setDefaultIndicator(<LoadingOutlined />)

const App: FC = () => {
  const isAuthenticated = useIsAuthenticated()
  return useRoutes(isAuthenticated ? privateRoutesConfig : publicRoutesConfig)
}

export default App
