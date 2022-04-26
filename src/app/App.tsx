import './App.less'

import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { publicRoutesConfig, privateRoutesConfig, Routes as RouteKeys } from './../routes.config';

import React, { FC, useEffect, useState } from 'react'


/** пока тестовый хук для отладки пока не подключено апи по авторизации */
function useMockAuth () {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsAuth(false);
    }, 1000);
  }, []);

  return {
    isLoading,
    isAuth,
  }

}
const App: FC = () => {

  const { isLoading, isAuth } = useMockAuth();

  const routesConfig = isAuth ? privateRoutesConfig : publicRoutesConfig;
  const defaultRoute = routesConfig.find(route => route.default);

  /** текущий pathname */
  const { pathname } = useLocation();

  if (isLoading) return null;
  return (
    <>
      {pathname === RouteKeys.index && defaultRoute && <Navigate to={defaultRoute.path} replace />}
      <Routes>
        {routesConfig
          .map(({ key, path, element: Element, layout: Layout }) => (
            <Route
              key={key}
              path={path}
              element={<Layout><Element /></Layout>}
            />
          ))}
      </Routes>
    </>
  );
}

export default App
