import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import React from 'react'

import { amountEquipmentSpentReportPageTestUtils } from '_tests_/features/warehouses/pages/AmountEquipmentSpentReportPage/testUtils'
import { employeesActionsReportPageTestUtils } from '_tests_/features/warehouses/pages/EmployeesActionsReportPage/testUtils'
import { historyNomenclatureOperationsReportPageTestUtils } from '_tests_/features/warehouses/pages/HistoryNomenclatureOperationsReportPage/testUtils'
import { reportsCatalogPageTestUtils } from '_tests_/features/warehouses/pages/ReportsCatalogPage/testUtils'
import {
  mockGetEquipmentNomenclaturesSuccess,
  mockGetLocationsCatalogSuccess,
} from '_tests_/mocks/api'
import { renderWithRouter } from '_tests_/helpers'

import AmountEquipmentSpentReportPage from '../AmountEquipmentSpentReportPage'
import EmployeesActionsReportPage from '../EmployeesActionsReportPage'
import HistoryNomenclatureOperationsReportPage from '../HistoryNomenclatureOperationsReportPage'
import ReportsCatalogPage from './index'

describe('Страница каталога отчетов', () => {
  describe('История операций по номенклатуре', () => {
    test('Отображается', async () => {
      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Reports,
            element: <ReportsCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reports], initialIndex: 0 },
      )

      const link = reportsCatalogPageTestUtils.getHistoryNomenclatureOperationsReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehousesRoutesEnum.HistoryNomenclatureOperations)
    })

    test('При клике переходит на страницу списка отчета по истории операций по номенклатуре', async () => {
      mockGetEquipmentNomenclaturesSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Reports,
            element: <ReportsCatalogPage />,
          },
          {
            path: WarehousesRoutesEnum.HistoryNomenclatureOperations,
            element: <HistoryNomenclatureOperationsReportPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reports], initialIndex: 0 },
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
            path: WarehousesRoutesEnum.Reports,
            element: <ReportsCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reports], initialIndex: 0 },
      )

      const link = reportsCatalogPageTestUtils.getEmployeesActionsReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehousesRoutesEnum.EmployeesActions)
    })

    test('При клике переходит на страницу списка отчета действий сотрудников', async () => {
      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Reports,
            element: <ReportsCatalogPage />,
          },
          {
            path: WarehousesRoutesEnum.EmployeesActions,
            element: <EmployeesActionsReportPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reports], initialIndex: 0 },
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
            path: WarehousesRoutesEnum.Reports,
            element: <ReportsCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reports], initialIndex: 0 },
      )

      const link = reportsCatalogPageTestUtils.getAmountEquipmentSpentReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehousesRoutesEnum.AmountEquipmentSpent)
    })

    test('При клике переходит на страницу списка отчета действий сотрудников', async () => {
      mockGetEquipmentNomenclaturesSuccess()
      mockGetLocationsCatalogSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Reports,
            element: <ReportsCatalogPage />,
          },
          {
            path: WarehousesRoutesEnum.AmountEquipmentSpent,
            element: <AmountEquipmentSpentReportPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reports], initialIndex: 0 },
      )

      await reportsCatalogPageTestUtils.clickAmountEquipmentSpentReportPageLink(user)
      const page = amountEquipmentSpentReportPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
