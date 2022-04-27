import PrivateLayout from 'components/Layout/PrivateLayout'
import NotFound from 'components/NotFound'

import { RoutesEnum } from './constants'
import { RouteConfig } from './interfaces'

export default [
  {
    path: RoutesEnum.NotFound,
    element: NotFound,
    layout: PrivateLayout,
    index: true,
  },
] as RouteConfig[]
