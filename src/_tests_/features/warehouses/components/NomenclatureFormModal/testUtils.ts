import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull } from 'shared/types/utils'

import { addModeProps } from '_tests_/features/warehouses/components/NomenclatureFormModal/constants'
import { TestIdsEnum } from '_tests_/features/warehouses/components/NomenclatureFormModal/constants'
import { buttonTestUtils, checkboxTestUtils, selectTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.NomenclatureFormModal)
const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId(TestIdsEnum.NomenclatureFormModal)

// name field
const getNameFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.NameFormItem)

const getNameLabel = () => within(getNameFormItem()).getByLabelText('Наименование')

const getNameField = () => within(getNameFormItem()).getByPlaceholderText('Введите наименование')

const setName = async (user: UserEvent, value: string) => {
  const field = getNameField()
  await user.type(field, value)
  return field
}

const findNameError = (error: string): Promise<HTMLElement> =>
  within(getNameFormItem()).findByText(error)

// short name field
const getShortNameFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.ShortNameFormItem)

const getShortNameLabel = () =>
  within(getShortNameFormItem()).getByLabelText('Краткое наименование')

const getShortNameField = () =>
  within(getShortNameFormItem()).getByPlaceholderText('Введите краткое наименование')

const setShortName = async (user: UserEvent, value: string) => {
  const field = getShortNameField()
  await user.type(field, value)
  return field
}

const findShortNameError = (error: string): Promise<HTMLElement> =>
  within(getShortNameFormItem()).findByText(error)

// group field
const getGroupFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.GroupFormItem)
const getGroupLabel = () => within(getGroupFormItem()).getByLabelText('Группа')
const getGroupField = () => selectTestUtils.getSelect(getGroupFormItem())
const setGroup = selectTestUtils.clickSelectOption
const getGroupOption = selectTestUtils.getSelectOption

const getSelectedGroup = (value: string): HTMLElement =>
  within(getGroupFormItem()).getByTitle(value)

const querySelectedGroup = (value: string): MaybeNull<HTMLElement> =>
  within(getGroupFormItem()).queryByTitle(value)

const openGroupSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getGroupFormItem())
}

const findGroupError = (error: string): Promise<HTMLElement> =>
  within(getGroupFormItem()).findByText(error)

const expectGroupLoadingStarted = () => selectTestUtils.expectLoadingStarted(getGroupFormItem())

const expectGroupLoadingFinished = () => selectTestUtils.expectLoadingFinished(getGroupFormItem())

// vendor code field
const getVendorCodeFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.VendorCodeFormItem)

const getVendorCodeLabel = () => within(getVendorCodeFormItem()).getByLabelText('Артикул')

const getVendorCodeField = () =>
  within(getVendorCodeFormItem()).getByPlaceholderText('Введите артикул')

const setVendorCode = async (user: UserEvent, value: string) => {
  const field = getVendorCodeField()
  await user.type(field, value)
  return field
}

const findVendorCodeError = (error: string): Promise<HTMLElement> =>
  within(getVendorCodeFormItem()).findByText(error)

// measurement unit field
const getMeasurementUnitFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.MeasurementUnitFormItem)

const getMeasurementUnitLabel = () =>
  within(getMeasurementUnitFormItem()).getByLabelText('Единица измерения')

const getMeasurementUnitField = () => selectTestUtils.getSelect(getMeasurementUnitFormItem())
const setMeasurementUnit = selectTestUtils.clickSelectOption
const getMeasurementUnitOption = selectTestUtils.getSelectOption

const getSelectedMeasurementUnit = (value: string): HTMLElement =>
  within(getMeasurementUnitFormItem()).getByTitle(value)

const querySelectedMeasurementUnit = (value: string): MaybeNull<HTMLElement> =>
  within(getMeasurementUnitFormItem()).queryByTitle(value)

const openMeasurementUnitSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getMeasurementUnitFormItem())
}

const findMeasurementUnitError = (error: string): Promise<HTMLElement> =>
  within(getMeasurementUnitFormItem()).findByText(error)

const expectMeasurementUnitLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getMeasurementUnitFormItem())

const expectMeasurementUnitLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getMeasurementUnitFormItem())

// country field
const getCountryFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.CountryFormItem)
const getCountryLabel = () => within(getCountryFormItem()).getByLabelText('Страна производитель')
const getCountryField = () => selectTestUtils.getSelect(getCountryFormItem())
const setCountry = selectTestUtils.clickSelectOption
const getCountryOption = selectTestUtils.getSelectOption

const getSelectedCountry = (value: string): HTMLElement =>
  within(getCountryFormItem()).getByTitle(value)

const querySelectedCountry = (value: string): MaybeNull<HTMLElement> =>
  within(getCountryFormItem()).queryByTitle(value)

const openCountrySelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getCountryFormItem())
}

const findCountryError = (error: string): Promise<HTMLElement> =>
  within(getCountryFormItem()).findByText(error)

const expectCountryLoadingStarted = () => selectTestUtils.expectLoadingStarted(getCountryFormItem())

const expectCountryLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getCountryFormItem())

// submit button
const getSubmitButton = (name: RegExp) => buttonTestUtils.getButtonIn(getContainer(), name)

const querySubmitButton = (name: RegExp) => buttonTestUtils.queryButtonIn(getContainer(), name)

const clickSubmitButton = async (user: UserEvent, name: RegExp) => {
  const button = getSubmitButton(name)
  await user.click(button)
}

// equipment has serial number field
const getEquipmentHasSerialNumberFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.EquipmentHasSerialNumberFormItem)

const getEquipmentHasSerialNumberField = () =>
  checkboxTestUtils.getCheckboxIn(getEquipmentHasSerialNumberFormItem())

const setEquipmentHasSerialNumber = async (user: UserEvent) => {
  const field = getEquipmentHasSerialNumberField()
  await user.click(field)
  return field
}

// add button
const getAddButton = () => getSubmitButton(new RegExp(addModeProps.okText))

const queryAddButton = () => querySubmitButton(new RegExp(addModeProps.okText))

const clickAddButton = async (user: UserEvent) => {
  const button = getAddButton()
  await user.click(button)
}

// close button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /Отменить/)

const queryCancelButton = () => buttonTestUtils.queryButtonIn(getContainer(), /Отменить/)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const nomenclatureFormModalTestUtils = {
  getContainer,
  findContainer,

  getSubmitButton,
  querySubmitButton,
  clickSubmitButton,

  getAddButton,
  queryAddButton,
  clickAddButton,

  getCancelButton,
  queryCancelButton,
  clickCancelButton,

  getNameFormItem,
  getNameLabel,
  getNameField,
  setName,
  findNameError,

  getShortNameFormItem,
  getShortNameLabel,
  getShortNameField,
  setShortName,
  findShortNameError,

  getGroupFormItem,
  getGroupLabel,
  getGroupField,
  setGroup,
  getGroupOption,
  getSelectedGroup,
  querySelectedGroup,
  openGroupSelect,
  findGroupError,
  expectGroupLoadingStarted,
  expectGroupLoadingFinished,

  getVendorCodeFormItem,
  getVendorCodeLabel,
  getVendorCodeField,
  setVendorCode,
  findVendorCodeError,

  getMeasurementUnitFormItem,
  getMeasurementUnitLabel,
  getMeasurementUnitField,
  setMeasurementUnit,
  getMeasurementUnitOption,
  getSelectedMeasurementUnit,
  querySelectedMeasurementUnit,
  openMeasurementUnitSelect,
  findMeasurementUnitError,
  expectMeasurementUnitLoadingStarted,
  expectMeasurementUnitLoadingFinished,

  getCountryFormItem,
  getCountryLabel,
  getCountryField,
  setCountry,
  getCountryOption,
  getSelectedCountry,
  querySelectedCountry,
  openCountrySelect,
  findCountryError,
  expectCountryLoadingStarted,
  expectCountryLoadingFinished,

  getEquipmentHasSerialNumberFormItem,
  getEquipmentHasSerialNumberField,
  setEquipmentHasSerialNumber,
}
