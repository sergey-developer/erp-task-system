import { FC } from 'react'
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

export type AppRoutesProps = {
  routes: Array<RouteObject>
}

const AppRoutes: FC<AppRoutesProps> = ({ routes }) => {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default AppRoutes
