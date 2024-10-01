import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, selectTestUtils, tableTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () =>
  screen.getByTestId(TestIdsEnum.ChangeInfrastructureOrderFormTableContainer)

const getRowByRole = () => tableTestUtils.getOneRowByRole(getContainer())

// add order form works button
const getAddEquipmentButton = () => buttonTestUtils.getButtonIn(getContainer(), /Добавить работы/)
const clickAddOrderFormWorksButton = async (user: UserEvent) => user.click(getAddEquipmentButton())

// work type field
const getWorkTypeFormItem = (row: HTMLElement) => within(row).getByTestId('name-form-item')

const getWorkTypeSelect = (row: HTMLElement) => selectTestUtils.getSelect(getWorkTypeFormItem(row))

const setWorkType = selectTestUtils.clickSelectOption

const openWorkTypeSelect = async (user: UserEvent, row: HTMLElement) =>
  selectTestUtils.openSelect(user, getWorkTypeFormItem(row))

// budget field
const getBudgetTypeFormItem = (row: HTMLElement) => within(row).getByTestId('budget-type-form-item')

const getBudgetTypeField = (row: HTMLElement) =>
  within(getBudgetTypeFormItem(row)).getByRole('textbox')

// labor costs field
const getLaborCostsFormItem = (row: HTMLElement) => within(row).getByTestId('labor-costs-form-item')

const getLaborCostsField = (row: HTMLElement) =>
  within(getLaborCostsFormItem(row)).getByRole('spinbutton')

// amount field
const getAmountFormItem = (row: HTMLElement) => within(row).getByTestId('amount-form-item')

const getAmountInput = (row: HTMLElement) => within(getAmountFormItem(row)).getByRole('spinbutton')

const setAmount = async (user: UserEvent, row: HTMLElement, value: number) => {
  const input = getAmountInput(row)
  await user.type(input, String(value))
  return input
}

// cost field
const getCostFormItem = (row: HTMLElement) => within(row).getByTestId('cost-form-item')

const getCostField = (row: HTMLElement) => within(getCostFormItem(row)).getByRole('spinbutton')

// price field
const getPriceFormItem = (row: HTMLElement) => within(row).getByTestId('price-form-item')

const getPriceField = (row: HTMLElement) => within(getPriceFormItem(row)).getByRole('spinbutton')

export const changeInfrastructureOrderFormTableTestUtils = {
  getContainer,

  getRowByRole,

  clickAddOrderFormWorksButton,

  getWorkTypeSelect,
  setWorkType,
  openWorkTypeSelect,

  getBudgetTypeField,

  getLaborCostsField,

  getAmountInput,
  setAmount,

  getCostField,

  getPriceField,
}
