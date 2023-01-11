import 'styles/index.less'

import { FC } from 'react'

import { useIsAuthenticated } from 'modules/auth/hooks'

import PrivateApp from './PrivateApp'
import PublicApp from './PublicApp'

const App: FC = () => {
  const isAuthenticated = useIsAuthenticated()
  return isAuthenticated ? <PrivateApp /> : <PublicApp />
}

export default App
