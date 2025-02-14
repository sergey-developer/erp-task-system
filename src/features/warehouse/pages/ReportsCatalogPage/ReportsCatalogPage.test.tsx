import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'
import React from 'react'

import { amountEquipmentSpentReportPageTestUtils } from '_tests_/features/warehouse/pages/AmountEquipmentSpentReportPage/testUtils'
import { employeesActionsReportPageTestUtils } from '_tests_/features/warehouse/pages/EmployeesActionsReportPage/testUtils'
import { historyNomenclatureOperationsReportPageTestUtils } from '_tests_/features/warehouse/pages/HistoryNomenclatureOperationsReportPage/testUtils'
import { reportsCatalogPageTestUtils } from '_tests_/features/warehouse/pages/ReportsCatalogPage/testUtils'
import {
  mockGetEquipmentNomenclaturesSuccess,
  mockGetLocationsCatalogSuccess,
} from '_tests_/mocks/api'
import { renderWithRouter } from '_tests_/utils'

import HistoryNomenclatureOperationsReportPage from '../../../nomenclatures/pages/HistoryNomenclatureOperationsReportPage'
import AmountEquipmentSpentReportPage from '../AmountEquipmentSpentReportPage'
import EmployeesActionsReportPage from '../EmployeesActionsReportPage'
import ReportsCatalogPage from './index'

describe('Страница каталога отчетов', () => {
  describe('История операций по номенклатуре', () => {
    test('Отображается', async () => {
      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reports,
            element: <ReportsCatalogPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reports], initialIndex: 0 },
      )

      const link = reportsCatalogPageTestUtils.getHistoryNomenclatureOperationsReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.HistoryNomenclatureOperations)
    })

    test('При клике переходит на страницу списка отчета по истории операций по номенклатуре', async () => {
      mockGetEquipmentNomenclaturesSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reports,
            element: <ReportsCatalogPage />,
          },
          {
            path: WarehouseRouteEnum.HistoryNomenclatureOperations,
            element: <HistoryNomenclatureOperationsReportPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reports], initialIndex: 0 },
      )

      await reportsCatalogPageTestUtils.clickHistoryNomenclatureOperationsReportPageLink(user)
      const page = historyNomenclatureOperationsReportPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Действия сотрудников', () => {
    test('Отображается', async () => {
      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reports,
            element: <ReportsCatalogPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reports], initialIndex: 0 },
      )

      const link = reportsCatalogPageTestUtils.getEmployeesActionsReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.EmployeesActions)
    })

    test('При клике переходит на страницу списка отчета действий сотрудников', async () => {
      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reports,
            element: <ReportsCatalogPage />,
          },
          {
            path: WarehouseRouteEnum.EmployeesActions,
            element: <EmployeesActionsReportPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reports], initialIndex: 0 },
      )

      await reportsCatalogPageTestUtils.clickEmployeesActionsReportPageLink(user)
      const page = employeesActionsReportPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Количество потраченного оборудования', () => {
    test('Отображается', async () => {
      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reports,
            element: <ReportsCatalogPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reports], initialIndex: 0 },
      )

      const link = reportsCatalogPageTestUtils.getAmountEquipmentSpentReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.AmountEquipmentSpent)
    })

    test('При клике переходит на страницу списка отчета действий сотрудников', async () => {
      mockGetEquipmentNomenclaturesSuccess()
      mockGetLocationsCatalogSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reports,
            element: <ReportsCatalogPage />,
          },
          {
            path: WarehouseRouteEnum.AmountEquipmentSpent,
            element: <AmountEquipmentSpentReportPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reports], initialIndex: 0 },
      )

      await reportsCatalogPageTestUtils.clickAmountEquipmentSpentReportPageLink(user)
      const page = amountEquipmentSpentReportPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
