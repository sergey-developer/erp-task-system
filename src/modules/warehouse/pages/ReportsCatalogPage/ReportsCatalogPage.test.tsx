import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { mockGetEquipmentNomenclaturesSuccess, mockGetLocationListSuccess } from '_tests_/mocks/api'
import { linkTestUtils, renderInRoute_latest } from '_tests_/utils'

import AmountEquipmentSpentReportPage from '../AmountEquipmentSpentReportPage'
import { testUtils as amountEquipmentSpentReportPageTestUtils } from '../AmountEquipmentSpentReportPage/AmountEquipmentSpentReportPage.test'
import EmployeesActionsReportPage from '../EmployeesActionsReportPage'
import { testUtils as employeesActionsReportPageTestUtils } from '../EmployeesActionsReportPage/EmployeesActionsReportPage.test'
import HistoryNomenclatureOperationsReportPage from '../HistoryNomenclatureOperationsReportPage'
import { testUtils as historyNomenclatureOperationsReportPageTestUtils } from '../HistoryNomenclatureOperationsReportPage/HistoryNomenclatureOperationsReportPage.test'
import ReportsCatalogPage from './index'

const getContainer = () => screen.getByTestId('reports-page')
const getCatalogContainer = () => within(getContainer()).getByTestId('reports')

// history nomenclature operations link
const getHistoryNomenclatureOperationsReportPageLink = () =>
  linkTestUtils.getLinkIn(getCatalogContainer(), 'История операций по номенклатуре')

const clickHistoryNomenclatureOperationsReportPageLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'История операций по номенклатуре')

// employees actions link
const getEmployeesActionsReportPageLink = () =>
  linkTestUtils.getLinkIn(getCatalogContainer(), 'Действия сотрудников')

const clickEmployeesActionsReportPageLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'Действия сотрудников')

// amount equipment spent link
const getAmountEquipmentSpentReportPageLink = () =>
  linkTestUtils.getLinkIn(getCatalogContainer(), 'Количество потраченного оборудования')

const clickAmountEquipmentSpentReportPageLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'Количество потраченного оборудования')

export const testUtils = {
  getContainer,

  getCatalogContainer,

  getHistoryNomenclatureOperationsReportPageLink,
  clickHistoryNomenclatureOperationsReportPageLink,

  getEmployeesActionsReportPageLink,
  clickEmployeesActionsReportPageLink,

  getAmountEquipmentSpentReportPageLink,
  clickAmountEquipmentSpentReportPageLink,
}

describe('Страница каталога отчетов', () => {
  describe('История операций по номенклатуре', () => {
    test('Отображается', async () => {
      renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.Reports,
            element: <ReportsCatalogPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reports], initialIndex: 0 },
      )

      const link = testUtils.getHistoryNomenclatureOperationsReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.HistoryNomenclatureOperations)
    })

    test('При клике переходит на страницу списка отчета по истории операций по номенклатуре', async () => {
      mockGetEquipmentNomenclaturesSuccess()

      const { user } = renderInRoute_latest(
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

      await testUtils.clickHistoryNomenclatureOperationsReportPageLink(user)
      const page = historyNomenclatureOperationsReportPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Действия сотрудников', () => {
    test('Отображается', async () => {
      renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.Reports,
            element: <ReportsCatalogPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reports], initialIndex: 0 },
      )

      const link = testUtils.getEmployeesActionsReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.EmployeesActions)
    })

    test('При клике переходит на страницу списка отчета действий сотрудников', async () => {
      const { user } = renderInRoute_latest(
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

      await testUtils.clickEmployeesActionsReportPageLink(user)
      const page = employeesActionsReportPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Количество потраченного оборудования', () => {
    test('Отображается', async () => {
      renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.Reports,
            element: <ReportsCatalogPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reports], initialIndex: 0 },
      )

      const link = testUtils.getAmountEquipmentSpentReportPageLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.AmountEquipmentSpent)
    })

    test('При клике переходит на страницу списка отчета действий сотрудников', async () => {
      mockGetEquipmentNomenclaturesSuccess()
      mockGetLocationListSuccess()

      const { user } = renderInRoute_latest(
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

      await testUtils.clickAmountEquipmentSpentReportPageLink(user)
      const page = amountEquipmentSpentReportPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
