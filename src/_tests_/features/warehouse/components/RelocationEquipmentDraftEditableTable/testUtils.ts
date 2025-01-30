import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouse/components/RelocationEquipmentDraftEditableTable/constants'
import { buttonTestUtils, selectTestUtils, tableTestUtils } from '_tests_/utils'

const getContainer = () =>
  screen.getByTestId(TestIdsEnum.RelocationEquipmentDraftEditableTableContainer)

const getRowByRole = () => tableTestUtils.getOneRowByRole(getContainer())

// add equipment button
const getAddEquipmentButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Добавить оборудование/)

const clickAddEquipmentButton = async (user: UserEvent) => user.click(getAddEquipmentButton())

// delete equipment button
const getDeleteEquipmentButton = (row: HTMLElement) =>
  buttonTestUtils.getButtonIn(row, 'minus-circle')

const clickDeleteEquipmentButton = async (user: UserEvent, row: HTMLElement) =>
  user.click(getDeleteEquipmentButton(row))

// equipment field
const getEquipmentFormItem = (row: HTMLElement) =>
  within(row).getByTestId(TestIdsEnum.EquipmentFormItem)

const getEquipmentSelect = (row: HTMLElement) =>
  selectTestUtils.getSelect(getEquipmentFormItem(row))

const setEquipment = selectTestUtils.clickSelectOption

const openEquipmentSelect = async (user: UserEvent, row: HTMLElement) =>
  selectTestUtils.openSelect(user, getEquipmentFormItem(row))

const findEquipmentError = (error: string, row: HTMLElement) =>
  within(getEquipmentFormItem(row)).findByText(error)

const expectEquipmentsLoadingFinished = (row: HTMLElement) =>
  selectTestUtils.expectLoadingFinished(getEquipmentFormItem(row))

// serial number field
const getSerialNumberFormItem = (row: HTMLElement) =>
  within(row).getByTestId(TestIdsEnum.SerialNumberFormItem)

const getSerialNumberField = (row: HTMLElement) =>
  within(getSerialNumberFormItem(row)).getByRole('textbox')

const setSerialNumber = async (user: UserEvent, value: string, row: HTMLElement) =>
  user.type(getSerialNumberField(row), value)

// condition field
const getConditionFormItem = (row: HTMLElement) =>
  within(row).getByTestId(TestIdsEnum.ConditionFormItem)

const getConditionSelect = (row: HTMLElement) =>
  selectTestUtils.getSelect(getConditionFormItem(row))

const setCondition = selectTestUtils.clickSelectOption

const openConditionSelect = async (user: UserEvent, row: HTMLElement) =>
  selectTestUtils.openSelect(user, getConditionFormItem(row))

const findConditionError = (error: string, row: HTMLElement) =>
  within(getConditionFormItem(row)).findByText(error)

// price field
const getPriceFormItem = (row: HTMLElement) => within(row).getByTestId(TestIdsEnum.PriceFormItem)
const getPriceField = (row: HTMLElement) => within(getPriceFormItem(row)).getByRole('spinbutton')
const setPrice = async (user: UserEvent, value: number, row: HTMLElement) =>
  user.type(getPriceField(row), String(value))

// currency field
const getCurrencyFormItem = (row: HTMLElement) =>
  within(row).getByTestId(TestIdsEnum.CurrencyFormItem)
const getCurrencySelect = (row: HTMLElement) => selectTestUtils.getSelect(getCurrencyFormItem(row))
const setCurrency = selectTestUtils.clickSelectOption
const openCurrencySelect = async (user: UserEvent, row: HTMLElement) =>
  selectTestUtils.openSelect(user, getCurrencyFormItem(row))

// quantity field
const getQuantityFormItem = (row: HTMLElement) =>
  within(row).getByTestId(TestIdsEnum.QuantityFormItem)

const getQuantityField = (row: HTMLElement) =>
  within(getQuantityFormItem(row)).getByRole('spinbutton')

const setQuantity = async (user: UserEvent, value: number, row: HTMLElement) =>
  user.type(getQuantityField(row), String(value))

// attachments
const getAttachmentsFormItem = (row: HTMLElement) =>
  within(row).getByTestId(TestIdsEnum.AttachmentsFormItem)

const getAttachmentsButton = (row: HTMLElement) =>
  buttonTestUtils.getButtonIn(getAttachmentsFormItem(row), 'Добавить')

const clickAttachmentsButton = async (user: UserEvent, row: HTMLElement) =>
  user.click(getAttachmentsButton(row))

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const relocationEquipmentDraftEditableTableTestUtils = {
  getContainer,
  getRowByRole,

  getEquipmentSelect,
  setEquipment,
  openEquipmentSelect,
  findEquipmentError,
  expectEquipmentsLoadingFinished,

  getSerialNumberField,
  setSerialNumber,

  getConditionSelect,
  setCondition,
  openConditionSelect,
  findConditionError,

  getPriceField,
  setPrice,

  getCurrencySelect,
  setCurrency,
  openCurrencySelect,

  getQuantityField,
  setQuantity,

  getAttachmentsButton,
  clickAttachmentsButton,

  clickAddEquipmentButton,
  clickDeleteEquipmentButton,

  expectLoadingStarted,
  expectLoadingFinished,
}
