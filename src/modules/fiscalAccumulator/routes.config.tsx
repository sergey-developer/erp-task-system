import React from 'react'
import { RouteObject } from 'react-router-dom'

import { FiscalAccumulatorRouteEnum } from './constants'

const FiscalAccumulatorsPage = React.lazy(
  () => import('modules/fiscalAccumulator/pages/FiscalAccumulatorsPage'),
)

export const route: Readonly<RouteObject> = {
  path: FiscalAccumulatorRouteEnum.FiscalAccumulator,
  element: <FiscalAccumulatorsPage />,
}
