import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import FiscalAccumulatorTasksReportPage from 'features/reports/pages/FiscalAccumulatorTasksReportPage'
import { testUtils as fiscalAccumulatorTasksReportPageTestUtils } from 'features/reports/pages/FiscalAccumulatorTasksReportPage/FiscalAccumulatorTasksReportPage.test'
import MtsrReportPage from 'features/reports/pages/MtsrReportPage'
import { testUtils as mtsrReportPageTestUtils } from 'features/reports/pages/MtsrReportPage/MtsrReportPage.test'
import { ReportsRoutesEnum } from 'features/reports/routes/routes'
import { UserPermissionsEnum } from 'features/users/api/constants'
import React from 'react'

import userFixtures from '_tests_/fixtures/users'
import {
  mockGetCustomerListSuccess,
  mockGetFiscalAccumulatorTasksSuccess,
  mockGetMacroregionsMtsrReportSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, linkTestUtils, render, renderWithRouter } from '_tests_/utils'

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
    test(`Не отображается если нет прав ${UserPermissionsEnum.FiscalAccumulatorTasksRead}`, async () => {
      render(<ReportsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock(userFixtures.user({ permissions: [] })),
          },
        }),
      })

      const link = testUtils.queryFiscalAccumulatorTasksReportPageLink()
      expect(link).not.toBeInTheDocument()
    })

    test(`Отображается если есть права ${UserPermissionsEnum.FiscalAccumulatorTasksRead}`, async () => {
      render(<ReportsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock(
              userFixtures.user({ permissions: [UserPermissionsEnum.FiscalAccumulatorTasksRead] }),
            ),
          },
        }),
      })

      const link = testUtils.getFiscalAccumulatorTasksReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', ReportsRoutesEnum.FiscalAccumulatorTasksReport)
    })

    test('При клике переходит на страницу отчёта по фискальным накопителям', async () => {
      mockGetFiscalAccumulatorTasksSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: ReportsRoutesEnum.ReportsRoot,
            element: <ReportsPage />,
          },
          {
            path: ReportsRoutesEnum.FiscalAccumulatorTasksReport,
            element: <FiscalAccumulatorTasksReportPage />,
          },
        ],
        { initialEntries: [ReportsRoutesEnum.ReportsRoot], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({
                  permissions: [UserPermissionsEnum.FiscalAccumulatorTasksRead],
                }),
              ),
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
              permissions: [UserPermissionsEnum.ReportMainIndicatorsRead],
            }),
          },
        }),
      })

      const link = testUtils.getMtsrReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', ReportsRoutesEnum.MtsrReport)
    })

    test('Не отображается если нет прав', async () => {
      render(<ReportsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      const link = testUtils.queryMtsrReportPageLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу отчёта основных показателей', async () => {
      mockGetMacroregionsMtsrReportSuccess()
      mockGetCustomerListSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: ReportsRoutesEnum.ReportsRoot,
            element: <ReportsPage />,
          },
          {
            path: ReportsRoutesEnum.MtsrReport,
            element: <MtsrReportPage />,
          },
        ],
        { initialEntries: [ReportsRoutesEnum.ReportsRoot], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [UserPermissionsEnum.ReportMainIndicatorsRead],
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
