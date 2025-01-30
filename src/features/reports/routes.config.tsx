import React from 'react'
import { RouteObject } from 'react-router-dom'

import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import ReportsPage from 'features/reports/pages/ReportsPage'
import { UserPermissionsEnum } from 'features/user/constants'
import { userHasPermissions } from 'features/user/utils'

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb'
import BreadcrumbsLayout from 'components/Layouts/BreadcrumbsLayout '

import { ReportsRoutesEnum } from './constants'

const FiscalAccumulatorTasksReportPage = React.lazy(
  () => import('features/reports/pages/FiscalAccumulatorTasksReportPage'),
)

const MtsrReportPage = React.lazy(() => import('features/reports/pages/MtsrReportPage'))

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
