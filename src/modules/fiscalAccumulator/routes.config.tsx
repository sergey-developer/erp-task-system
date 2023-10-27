import React from 'react'
import { RouteObject } from 'react-router-dom'

import { FiscalAccumulatorRouteEnum } from './constants'

const FiscalAccumulatorListPage = React.lazy(
  () => import('modules/fiscalAccumulator/pages/FiscalAccumulatorListPage'),
)

export const route: Readonly<RouteObject> = {
  path: FiscalAccumulatorRouteEnum.FiscalAccumulator,
  element: <FiscalAccumulatorListPage />,
}
