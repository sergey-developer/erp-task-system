import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { linkTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ReportsPage)
const getCatalogContainer = () => within(getContainer()).getByTestId(TestIdsEnum.Reports)

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

export const reportsCatalogPageTestUtils = {
  getContainer,

  getCatalogContainer,

  getHistoryNomenclatureOperationsReportPageLink,
  clickHistoryNomenclatureOperationsReportPageLink,

  getEmployeesActionsReportPageLink,
  clickEmployeesActionsReportPageLink,

  getAmountEquipmentSpentReportPageLink,
  clickAmountEquipmentSpentReportPageLink,
}
