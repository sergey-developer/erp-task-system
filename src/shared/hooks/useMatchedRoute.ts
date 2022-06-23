import { useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

type UseMatchedRouteResult = ReturnType<typeof matchPath>

const useMatchedRoute = (routes: Array<string>): UseMatchedRouteResult => {
  const location = useLocation()

  return useMemo(() => {
    return routes.reduce<UseMatchedRouteResult>((acc, route) => {
      const matchedPath = matchPath(route, location.pathname)
      if (matchedPath) acc = matchedPath
      return acc
    }, null)
  }, [routes, location])
}

export default useMatchedRoute
