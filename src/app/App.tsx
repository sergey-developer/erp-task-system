import './App.less'

import { FC, useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'

import Spin from 'components/Spin'
import {
  applyRoutesLayout,
  privateRoutesConfig,
  publicRoutesConfig,
} from 'configs/routes'
import useAuth from 'modules/auth/hooks/useAuth'

/** пока тестовый хук для отладки пока не подключено апи по авторизации */
function useMockAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAuth, setIsAuth] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      setIsAuth(false)
    }, 1000)
  }, [])

  return {
    isLoading,
    isAuth,
  }
}

const App: FC = () => {
  const { isLoading } = useMockAuth()
  const { isAuthenticated } = useAuth()
  const element = useRoutes(
    applyRoutesLayout(
      isAuthenticated ? privateRoutesConfig : publicRoutesConfig,
    ),
  )

  if (isLoading) return <Spin />
  return element
}

export default App
