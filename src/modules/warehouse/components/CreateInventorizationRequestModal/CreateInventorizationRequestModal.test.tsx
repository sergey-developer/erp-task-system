import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { selectTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId('create-inventorization-request-modal')

// deadline at field
const getDeadlineAtFormItem = () => within(getContainer()).getByTestId('deadline-at-form-item')

const getDeadlineAtDateFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId('deadline-at-date-form-item')

const getDeadlineAtDateField = (): HTMLInputElement =>
  within(getDeadlineAtDateFormItem()).getByPlaceholderText('Выберите дату')

const findDeadlineAtDateError = (text: string) =>
  within(getDeadlineAtDateFormItem()).findByText(text)

const setDeadlineAtDate = async (user: UserEvent, value: string) => {
  const field = getDeadlineAtDateField()
  await user.type(field, value)
  await user.tab()
  return field
}

const getDeadlineAtTimeFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId('deadline-at-time-form-item')

const getDeadlineAtTimeField = (): HTMLInputElement =>
  within(getDeadlineAtTimeFormItem()).getByPlaceholderText('Время')

const findDeadlineAtTimeError = (text: string) =>
  within(getDeadlineAtTimeFormItem()).findByText(text)

const setDeadlineAtTime = async (user: UserEvent, value: string) => {
  const field = getDeadlineAtTimeField()
  await user.type(field, value)
  await user.tab()
  return field
}

// type field
const getTypeFormItem = () => within(getContainer()).getByTestId('type-form-item')
const getTypeSelectInput = () => selectTestUtils.getSelect(getTypeFormItem())
const openTypeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeFormItem())
const setType = selectTestUtils.clickSelectOption
const getSelectedType = () => selectTestUtils.getSelectedOption(getTypeFormItem())
const findTypeError = async (text: string) => within(getTypeFormItem()).findByText(text)

// executor field
const getExecutorFormItem = () => within(getContainer()).getByTestId('executor-form-item')
const getExecutorSelectInput = () => selectTestUtils.getSelect(getExecutorFormItem())
const setExecutor = selectTestUtils.clickSelectOption
const findExecutorError = (text: string) => within(getExecutorFormItem()).findByText(text)

const openExecutorSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getExecutorFormItem())

const getSelectedExecutor = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getExecutorFormItem(), title)

const expectExecutorLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getExecutorFormItem())

const expectExecutorLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getExecutorFormItem())

// nomenclature field
const getNomenclatureFormItem = () => within(getContainer()).getByTestId('nomenclatures-form-item')
const getNomenclatureSelectInput = () => selectTestUtils.getSelect(getNomenclatureFormItem())
const setNomenclature = selectTestUtils.clickSelectOption

const getSelectedNomenclature = (value: string): HTMLElement =>
  within(getNomenclatureFormItem()).getByTitle(value)

const openNomenclatureSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getNomenclatureFormItem())
}

const findNomenclatureError = (error: string): Promise<HTMLElement> =>
  within(getNomenclatureFormItem()).findByText(error)

const expectNomenclatureLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getNomenclatureFormItem())

const expectNomenclatureLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getNomenclatureFormItem())

// warehouse field
const getWarehouseFormItem = () => within(getContainer()).getByTestId('warehouses-form-item')
const getWarehouseSelectInput = () => selectTestUtils.getSelect(getWarehouseFormItem())
const setWarehouse = selectTestUtils.clickSelectOption

const getSelectedWarehouse = (value: string): HTMLElement =>
  within(getWarehouseFormItem()).getByTitle(value)

const openWarehouseSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getWarehouseFormItem())
}

const findWarehouseError = (error: string): Promise<HTMLElement> =>
  within(getWarehouseFormItem()).findByText(error)

const expectWarehouseLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getWarehouseFormItem())

const expectWarehouseLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getWarehouseFormItem())

export const testUtils = {
  getContainer,

  getTypeSelectInput,
  openTypeSelect,
  setType,
  findTypeError,
  getSelectedType,

  getNomenclatureSelectInput,
  setNomenclature,
  getSelectedNomenclature,
  openNomenclatureSelect,
  findNomenclatureError,
  expectNomenclatureLoadingStarted,
  expectNomenclatureLoadingFinished,

  getWarehouseSelectInput,
  setWarehouse,
  getSelectedWarehouse,
  openWarehouseSelect,
  findWarehouseError,
  expectWarehouseLoadingStarted,
  expectWarehouseLoadingFinished,

  getDeadlineAtDateField,
  findDeadlineAtDateError,
  setDeadlineAtDate,
  getDeadlineAtTimeField,
  findDeadlineAtTimeError,
  setDeadlineAtTime,

  getExecutorSelectInput,
  setExecutor,
  findExecutorError,
  openExecutorSelect,
  getSelectedExecutor,
  expectExecutorLoadingStarted,
  expectExecutorLoadingFinished,
}

test.todo('create-inventorization-request-modal')
