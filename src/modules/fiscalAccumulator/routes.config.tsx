import React from 'react'
import { RouteObject } from 'react-router-dom'

import { FiscalAccumulatorRouteEnum } from './constants'

const FiscalAccumulatorTasksPage = React.lazy(
  () => import('modules/fiscalAccumulator/pages/FiscalAccumulatorTasksPage'),
)

export const route: Readonly<RouteObject> = {
  path: FiscalAccumulatorRouteEnum.FiscalAccumulator,
  element: <FiscalAccumulatorTasksPage />,
}
