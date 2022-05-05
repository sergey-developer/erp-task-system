import { matchPath, useLocation } from 'react-router-dom'

import { RoutesEnum } from 'configs/routes'

type UseMatchedRouteResult = ReturnType<typeof matchPath>

const useMatchedRoute = (routes: Array<RoutesEnum>): UseMatchedRouteResult => {
  const location = useLocation()

  return routes.reduce<UseMatchedRouteResult>((acc, route) => {
    const matchedPath = matchPath(route, location.pathname)
    if (matchedPath) acc = matchedPath
    return acc
  }, null)
}

export default useMatchedRoute
