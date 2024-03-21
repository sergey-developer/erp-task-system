import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { ReportsRoutesEnum } from 'modules/reports/constants'
import FiscalAccumulatorTasksReportPage from 'modules/reports/pages/FiscalAccumulatorTasksReportPage'
import { testUtils as fiscalAccumulatorTasksReportPageTestUtils } from 'modules/reports/pages/FiscalAccumulatorTasksReportPage/FiscalAccumulatorTasksReportPage.test'
import MtsrReportPage from 'modules/reports/pages/MtsrReportPage'
import { testUtils as mtsrReportPageTestUtils } from 'modules/reports/pages/MtsrReportPage/MtsrReportPage.test'
import { UserPermissionsEnum } from 'modules/user/constants'

import {
  mockGetCustomerListSuccess,
  mockGetFiscalAccumulatorTasksSuccess,
  mockGetMacroregionsMtsrReportSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, linkTestUtils, render, renderInRoute_latest } from '_tests_/utils'

import ReportsPage from './index'

const getContainer = () => screen.getByTestId('reports-page')
const getCatalogContainer = () => within(getContainer()).getByTestId('reports-catalog')

// fiscal accumulator tasks report link
const getFiscalAccumulatorTasksReportPageLink = () =>
  linkTestUtils.getLinkIn(getCatalogContainer(), 'Отчёт по фискальным накопителям')

const queryFiscalAccumulatorTasksReportPageLink = () =>
  linkTestUtils.queryLinkIn(getCatalogContainer(), 'Отчёт по фискальным накопителям')

const clickFiscalAccumulatorTasksReportPageLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'Отчёт по фискальным накопителям')

// mtsr report link
const getMtsrReportPageLink = () =>
  linkTestUtils.getLinkIn(getCatalogContainer(), 'Отчёт основных показателей')

const queryMtsrReportPageLink = () =>
  linkTestUtils.queryLinkIn(getCatalogContainer(), 'Отчёт основных показателей')

const clickMtsrReportPageLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'Отчёт основных показателей')

export const testUtils = {
  getContainer,

  getCatalogContainer,

  getFiscalAccumulatorTasksReportPageLink,
  queryFiscalAccumulatorTasksReportPageLink,
  clickFiscalAccumulatorTasksReportPageLink,

  getMtsrReportPageLink,
  queryMtsrReportPageLink,
  clickMtsrReportPageLink,
}

describe('Страница отчётов', () => {
  describe('Отчёт по фискальным накопителям', () => {
    test('Отображается при наличии прав', async () => {
      render(<ReportsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({
              permissions: [UserPermissionsEnum.FiscalAccumulatorTasksRead],
            }),
          },
        }),
      })

      const link = testUtils.getFiscalAccumulatorTasksReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', ReportsRoutesEnum.FiscalAccumulatorTasksReport)
    })

    test('Не отображается если нет прав', async () => {
      render(<ReportsPage />)
      const link = testUtils.queryFiscalAccumulatorTasksReportPageLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу отчёта по фискальным накопителям', async () => {
      mockGetFiscalAccumulatorTasksSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: ReportsRoutesEnum.Reports,
            element: <ReportsPage />,
          },
          {
            path: ReportsRoutesEnum.FiscalAccumulatorTasksReport,
            element: <FiscalAccumulatorTasksReportPage />,
          },
        ],
        { initialEntries: [ReportsRoutesEnum.Reports], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [UserPermissionsEnum.FiscalAccumulatorTasksRead],
              }),
            },
          }),
        },
      )

      await testUtils.clickFiscalAccumulatorTasksReportPageLink(user)
      const page = fiscalAccumulatorTasksReportPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Отчёт основных показателей', () => {
    test('Отображается при наличии прав', async () => {
      render(<ReportsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({
              permissions: [UserPermissionsEnum.ReportMtsrRead],
            }),
          },
        }),
      })

      const link = testUtils.getMtsrReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', ReportsRoutesEnum.MtsrReport)
    })

    test('Не отображается если нет прав', async () => {
      render(<ReportsPage />)
      const link = testUtils.queryMtsrReportPageLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу отчёта основных показателей', async () => {
      mockGetMacroregionsMtsrReportSuccess()
      mockGetCustomerListSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: ReportsRoutesEnum.Reports,
            element: <ReportsPage />,
          },
          {
            path: ReportsRoutesEnum.MtsrReport,
            element: <MtsrReportPage />,
          },
        ],
        { initialEntries: [ReportsRoutesEnum.Reports], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [UserPermissionsEnum.ReportMtsrRead],
              }),
            },
          }),
        },
      )

      await testUtils.clickMtsrReportPageLink(user)
      const page = mtsrReportPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
