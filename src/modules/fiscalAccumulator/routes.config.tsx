import React from 'react'
import { RouteObject } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import { FiscalAccumulatorRouteEnum } from 'modules/fiscalAccumulator/constants'
import { checkRoleIsFirstLineSupport } from 'modules/user/utils'

const FiscalAccumulatorTasksPage = React.lazy(
  () => import('modules/fiscalAccumulator/pages/FiscalAccumulatorTasksPage'),
)

export const route: Readonly<RouteObject> = {
  path: FiscalAccumulatorRouteEnum.FiscalAccumulator,
  element: (
    <ProtectedRoute
      component={<FiscalAccumulatorTasksPage />}
      permitted={(user) => !checkRoleIsFirstLineSupport(user.role)}
    />
  ),
}
