import React from 'react'
import { RouteObject } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import ReportsPage from 'modules/reports/pages/ReportsPage'
import { UserPermissionsEnum } from 'modules/user/constants'
import { userHasPermissions } from 'modules/user/utils'

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb'
import BreadcrumbsLayout from 'components/Layouts/BreadcrumbsLayout '

import { ReportsRoutesEnum } from './constants'

const FiscalAccumulatorTasksReportPage = React.lazy(
  () => import('modules/reports/pages/FiscalAccumulatorTasksReportPage'),
)

const MtsrReportPage = React.lazy(() => import('modules/reports/pages/MtsrReportPage'))

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
            userHasPermissions(
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
    {
      path: ReportsRoutesEnum.FiscalAccumulatorTasksReport,
      element: (
        <ProtectedRoute
          component={<FiscalAccumulatorTasksReportPage />}
          permitted={(user) =>
            userHasPermissions(user, [UserPermissionsEnum.FiscalAccumulatorTasksRead])
          }
        />
      ),
      handle: {
        crumb: () => (
          <Breadcrumb
            link={ReportsRoutesEnum.FiscalAccumulatorTasksReport}
            text='Отчёт по фискальным накопителям'
          />
        ),
      },
    },
    {
      path: ReportsRoutesEnum.MtsrReport,
      element: (
        <ProtectedRoute
          component={<MtsrReportPage />}
          permitted={(user) =>
            userHasPermissions(user, [UserPermissionsEnum.ReportMainIndicatorsRead])
          }
        />
      ),
      handle: {
        crumb: () => (
          <Breadcrumb link={ReportsRoutesEnum.MtsrReport} text='Отчёт основных показателей' />
        ),
      },
    },
  ],
}
