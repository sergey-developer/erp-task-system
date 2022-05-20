import { matchPath, useLocation } from 'react-router-dom'

type UseMatchedRouteResult = ReturnType<typeof matchPath>

const useMatchedRoute = (routes: Array<string>): UseMatchedRouteResult => {
  const location = useLocation()

  return routes.reduce<UseMatchedRouteResult>((acc, route) => {
    const matchedPath = matchPath(route, location.pathname)
    if (matchedPath) acc = matchedPath
    return acc
  }, null)
}

export default useMatchedRoute
