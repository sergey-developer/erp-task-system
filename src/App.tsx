import './App.less'

import { FC, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'

import Spin from 'components/Spin'
import { privateRoutesConfig, publicRoutesConfig } from 'configs/routes'
import useAuth from 'modules/auth/hooks/useAuth'
import { useLazyTestRetrieveQuery } from 'shared/services/api/api.service'

const App: FC = () => {
  const { isAuthenticated } = useAuth()
  const [testLoadQuery, { isLoading }] = useLazyTestRetrieveQuery()

  useEffect(() => {
    if (isAuthenticated) {
      /** тестовая ручка проверит аутентификацию пользователя и выполнит релогин если токен протух */
      testLoadQuery()
    }
  }, [])
  const routes = useRoutes(
    isAuthenticated ? privateRoutesConfig : publicRoutesConfig,
  )

  return isLoading ? <Spin /> : routes
}

export default App
