import React from 'react'
import { RouteObject } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import ReportsPage from 'modules/reports/pages/ReportsPage'
import { UserPermissionsEnum } from 'modules/user/constants'
import { hasPermissions } from 'modules/user/utils'

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb'
import BreadcrumbsLayout from 'components/Layouts/BreadcrumbsLayout '

import { ReportsRoutesEnum } from './constants'

export const route: Readonly<RouteObject> = {
  path: ReportsRoutesEnum.Reports,
  element: <BreadcrumbsLayout />,
  handle: { crumb: () => <Breadcrumb link={ReportsRoutesEnum.Reports} text='Отчёты' /> },
  children: [
    {
      index: true,
      element: (
        <ProtectedRoute
          component={<ReportsPage />}
          permitted={(user) =>
            hasPermissions(
              user,
              [
                UserPermissionsEnum.FiscalAccumulatorTasksRead,
                UserPermissionsEnum.ReportMainIndicatorsRead,
              ],
              false,
            )
          }
        />
      ),
    },
  ],
}
