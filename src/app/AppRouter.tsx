import { FC } from 'react'
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

export type AppRouterProps = {
  routes: RouteObject[]
}

const AppRouter: FC<AppRouterProps> = ({ routes }) => {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default AppRouter
