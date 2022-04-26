import './App.less'

import { Route, Routes, Navigate, useLocation, useRoutes, RouteObject } from 'react-router-dom'
import { publicRoutesConfig, privateRoutesConfig, Routes as RouteKeys, applyRoutesLayout } from 'routes'

import React, { FC, useEffect, useState } from 'react'


/** пока тестовый хук для отладки пока не подключено апи по авторизации */
function useMockAuth () {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsAuth(true);
    }, 1000);
    setTimeout(() => {
      setIsLoading(false);
      setIsAuth(false);
    }, 3000);
  }, []);

  return {
    isLoading,
    isAuth,
  }

}
const App: FC = () => {

  const { isLoading, isAuth } = useMockAuth();
  const element = useRoutes(applyRoutesLayout(isAuth ? privateRoutesConfig : publicRoutesConfig));

  if (isLoading) return null;
  return element;
}

export default App
