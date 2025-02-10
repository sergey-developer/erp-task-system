import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import ReportsPage from 'features/reports/pages/ReportsPage'
import { UserPermissionsEnum } from 'features/user/api/constants'
import { userHasPermissions } from 'features/user/utils'
import React from 'react'
import { RouteObject } from 'react-router-dom'

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb'
import BreadcrumbsLayout from 'components/Layouts/BreadcrumbsLayout '

import { ReportsRoutesEnum } from './routes'

const FiscalAccumulatorTasksReportPage = React.lazy(
  () => import('features/reports/pages/FiscalAccumulatorTasksReportPage'),
)

const MtsrReportPage = React.lazy(() => import('features/reports/pages/MtsrReportPage'))

export const reportsRoutes: Readonly<RouteObject> = {
  path: ReportsRoutesEnum.ReportsRoot,
  element: <BreadcrumbsLayout />,
  handle: { crumb: () => <Breadcrumb link={ReportsRoutesEnum.ReportsRoot} text='Отчёты' /> },
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
