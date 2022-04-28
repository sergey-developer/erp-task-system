import { FC } from 'react'
import { RouteObject } from 'react-router-dom'

import PrivateLayout from 'components/Layout/PrivateLayout'
import PublicLayout from 'components/Layout/PublicLayout'

export type RouteConfig = RouteObject & {
  layout?: typeof PublicLayout | typeof PrivateLayout
  element: FC
}
