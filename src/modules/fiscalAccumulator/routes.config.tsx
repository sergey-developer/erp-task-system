import React from 'react'
import { RouteObject } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import { FiscalAccumulatorRouteEnum } from 'modules/fiscalAccumulator/constants'
import { checkRoleIsFirstLineSupport } from 'modules/user/utils'

const FiscalAccumulatorListPage = React.lazy(
  () => import('modules/fiscalAccumulator/pages/FiscalAccumulatorListPage'),
)

export const route: Readonly<RouteObject> = {
  path: FiscalAccumulatorRouteEnum.FiscalAccumulator,
  element: (
    <ProtectedRoute
      component={<FiscalAccumulatorListPage />}
      permitted={(user) => !checkRoleIsFirstLineSupport(user.role)}
    />
  ),
}
