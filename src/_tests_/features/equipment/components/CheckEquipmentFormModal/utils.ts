import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { SAVE_TEXT } from 'shared/constants/common'
import { MaybeNull } from 'shared/types/utils'

import {
  buttonTestUtils,
  radioButtonTestUtils,
  selectTestUtils,
  spinnerTestUtils,
} from '_tests_/utils'

const getContainer = () => screen.getByTestId('check-equipment-form-modal')
const findContainer = async () => screen.findByTestId('check-equipment-form-modal')

// save button
const getSaveButton = () => buttonTestUtils.getButtonIn(getContainer(), new RegExp(SAVE_TEXT))
const clickSaveButton = async (user: UserEvent) => user.click(getSaveButton())

// category field
const getCategoryFormItem = () => within(getContainer()).getByTestId('category-form-item')
const getCategorySelectInput = () => selectTestUtils.getSelect(getCategoryFormItem())
const setCategory = selectTestUtils.clickSelectOption
const getCategoryOption = selectTestUtils.getSelectOption

const getSelectedCategory = (value: string): HTMLElement =>
  within(getCategoryFormItem()).getByTitle(value)

const querySelectedCategory = (value: string): MaybeNull<HTMLElement> =>
  within(getCategoryFormItem()).queryByTitle(value)

const openCategorySelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getCategoryFormItem())
}

const findCategoryError = (error: string): Promise<HTMLElement> =>
  within(getCategoryFormItem()).findByText(error)

const expectCategoryLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getCategoryFormItem())

const expectCategoryLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getCategoryFormItem())

// nomenclature field
const getNomenclatureFormItem = () => within(getContainer()).getByTestId('nomenclatures-form-item')
const getNomenclatureLabel = () => within(getNomenclatureFormItem()).getByLabelText('Номенклатура')
const getNomenclatureSelectInput = () => selectTestUtils.getSelect(getNomenclatureFormItem())
const setNomenclature = selectTestUtils.clickSelectOption
const getNomenclatureOption = selectTestUtils.getSelectOption

const getSelectedNomenclature = (value: string): HTMLElement =>
  within(getNomenclatureFormItem()).getByTitle(value)

const querySelectedNomenclature = (value: string): MaybeNull<HTMLElement> =>
  within(getNomenclatureFormItem()).queryByTitle(value)

const openNomenclatureSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getNomenclatureFormItem())
}

const findNomenclatureError = (error: string): Promise<HTMLElement> =>
  within(getNomenclatureFormItem()).findByText(error)

const expectNomenclaturesLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getNomenclatureFormItem())

const expectNomenclaturesLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getNomenclatureFormItem())

const expectNomenclatureLoadingStarted =
  spinnerTestUtils.expectLoadingStarted('nomenclature-loading')

const expectNomenclatureLoadingFinished =
  spinnerTestUtils.expectLoadingFinished('nomenclature-loading')

// title field
const getTitleFormItem = () => within(getContainer()).getByTestId('title-form-item')
const getTitleLabel = () => within(getTitleFormItem()).getByLabelText('Наименование')
const getTitleField = () => within(getTitleFormItem()).getByPlaceholderText('Введите наименование')

const setTitle = async (user: UserEvent, value: string) => {
  const field = getTitleField()
  await user.type(field, value)
  return field
}

const findTitleError = (error: string): Promise<HTMLElement> =>
  within(getTitleFormItem()).findByText(error)

// inventory number field
const getInventoryNumberFormItem = () =>
  within(getContainer()).getByTestId('inventory-number-form-item')

const queryInventoryNumberFormItem = () =>
  within(getContainer()).queryByTestId('inventory-number-form-item')

const getInventoryNumberLabel = () =>
  within(getInventoryNumberFormItem()).getByLabelText('Инвентарный номер')

const getInventoryNumberField = () =>
  within(getInventoryNumberFormItem()).getByPlaceholderText('Введите инвентарный номер')

const setInventoryNumber = async (user: UserEvent, value: string) => {
  const field = getInventoryNumberField()
  await user.type(field, value)
  return field
}

// serial number field
const getSerialNumberFormItem = () => within(getContainer()).getByTestId('serial-number-form-item')

const querySerialNumberFormItem = () =>
  within(getContainer()).queryByTestId('serial-number-form-item')

const getSerialNumberLabel = () =>
  within(getSerialNumberFormItem()).getByLabelText('Серийный номер')

const getSerialNumberField = () =>
  within(getSerialNumberFormItem()).getByPlaceholderText('Введите серийный номер')

const setSerialNumber = async (user: UserEvent, value: string) => {
  const field = getSerialNumberField()
  await user.type(field, value)
  return field
}

const findSerialNumberError = (error: string): Promise<HTMLElement> =>
  within(getSerialNumberFormItem()).findByText(error)

// condition field
const getConditionFormItem = () => within(getContainer()).getByTestId('condition-form-item')
const getConditionLabel = () => within(getConditionFormItem()).getByLabelText('Состояние')
const getConditionSelectInput = () => selectTestUtils.getSelect(getConditionFormItem())
const setCondition = selectTestUtils.clickSelectOption
const getConditionOption = selectTestUtils.getSelectOption

const getSelectedCondition = (value: string): HTMLElement =>
  within(getConditionFormItem()).getByTitle(value)

const querySelectedCondition = (value: string): MaybeNull<HTMLElement> =>
  within(getConditionFormItem()).queryByTitle(value)

const openConditionSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getConditionFormItem())
}

const findConditionError = (error: string): Promise<HTMLElement> =>
  within(getConditionFormItem()).findByText(error)

// quantity field
const getQuantityFormItem = () => within(getContainer()).getByTestId('quantity-form-item')
const queryQuantityFormItem = () => within(getContainer()).queryByTestId('quantity-form-item')
const getQuantityLabel = () => within(getQuantityFormItem()).getByLabelText('Количество')
const getQuantityField = () => within(getQuantityFormItem()).getByRole('spinbutton')

const setQuantity = async (user: UserEvent, value: number) => {
  const field = getQuantityField()
  await user.type(field, String(value))
  return field
}

const findQuantityError = (error: string): Promise<HTMLElement> =>
  within(getQuantityFormItem()).findByText(error)

// measurement unit field
const getMeasurementUnitFormItem = () =>
  within(getContainer()).getByTestId('measurement-unit-form-item')

const queryMeasurementUnitFormItem = () =>
  within(getContainer()).queryByTestId('measurement-unit-form-item')

const getMeasurementUnitLabel = () => within(getMeasurementUnitFormItem()).getByText('Ед.измерения')

// price field
const getPriceFormItem = () => within(getContainer()).getByTestId('price-form-item')
const getPriceLabel = () => within(getPriceFormItem()).getByLabelText('Стоимость')
const getPriceField = () => within(getPriceFormItem()).getByPlaceholderText('Введите стоимость')

const setPrice = async (user: UserEvent, value: number) => {
  const field = getPriceField()
  await user.type(field, String(value))
  return field
}

// currency field
const getCurrencyFormItem = () => within(getContainer()).getByTestId('currency-form-item')
const getCurrencyLabel = () => within(getCurrencyFormItem()).getByLabelText('Валюта')
const getCurrencySelectInput = () => selectTestUtils.getSelect(getCurrencyFormItem())
const setCurrency = selectTestUtils.clickSelectOption
const getCurrencyOption = selectTestUtils.getSelectOption

const getSelectedCurrency = (value: string): HTMLElement =>
  within(getCurrencyFormItem()).getByTitle(value)

const openCurrencySelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getCurrencyFormItem())
}

const expectCurrencyLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getCurrencyFormItem())

const expectCurrencyLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getCurrencyFormItem())

// is new
const getIsNewFormItem = () => within(getContainer()).getByTestId('is-new-form-item')
const queryIsNewFormItem = () => within(getContainer()).queryByTestId('is-new-form-item')

const getIsNewField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getIsNewFormItem(), text)

const clickIsNewField = async (user: UserEvent, text: string) => {
  const field = getIsNewField(text)
  await user.click(field)
  return field
}

const findIsNewError = (error: string): Promise<HTMLElement> =>
  within(getIsNewFormItem()).findByText(error)

// is warranty
const getIsWarrantyFormItem = () => within(getContainer()).getByTestId('is-warranty-form-item')
const queryIsWarrantyFormItem = () => within(getContainer()).queryByTestId('is-warranty-form-item')

const getIsWarrantyField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getIsWarrantyFormItem(), text)

const clickIsWarrantyField = async (user: UserEvent, text: string) => {
  const field = getIsWarrantyField(text)
  await user.click(field)
  return field
}

const findIsWarrantyError = (error: string): Promise<HTMLElement> =>
  within(getIsWarrantyFormItem()).findByText(error)

// is repaired
const getIsRepairedFormItem = () => within(getContainer()).getByTestId('is-repaired-form-item')
const queryIsRepairedFormItem = () => within(getContainer()).queryByTestId('is-repaired-form-item')

const getIsRepairedField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getIsRepairedFormItem(), text)

const clickIsRepairedField = async (user: UserEvent, text: string) => {
  const field = getIsRepairedField(text)
  await user.click(field)
  return field
}

const findIsRepairedError = (error: string): Promise<HTMLElement> =>
  within(getIsRepairedFormItem()).findByText(error)

// usage counter field
const getUsageCounterFormItem = () => within(getContainer()).getByTestId('usage-counter-form-item')

const queryUsageCounterFormItem = () =>
  within(getContainer()).queryByTestId('usage-counter-form-item')

const getUsageCounterLabel = () =>
  within(getUsageCounterFormItem()).getByLabelText('Счетчик пробега текущий')

const getUsageCounterField = () =>
  within(getUsageCounterFormItem()).getByPlaceholderText('Введите значение')

const setUsageCounter = async (user: UserEvent, value: number) => {
  const field = getUsageCounterField()
  await user.type(field, String(value))
  return field
}

// owner field
const getOwnerFormItem = () => within(getContainer()).getByTestId('owner-form-item')
const queryOwnerFormItem = () => within(getContainer()).queryByTestId('owner-form-item')
const getOwnerLabel = () => within(getOwnerFormItem()).getByLabelText('Владелец оборудования')
const getOwnerSelectInput = () => selectTestUtils.getSelect(getOwnerFormItem())
const setOwner = selectTestUtils.clickSelectOption
const getOwnerOption = selectTestUtils.getSelectOption
const findOwnerError = (error: string): Promise<HTMLElement> =>
  within(getOwnerFormItem()).findByText(error)

const getSelectedOwner = (value: string): HTMLElement =>
  within(getOwnerFormItem()).getByTitle(value)

const openOwnerSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getOwnerFormItem())
}

const expectOwnerLoadingStarted = () => selectTestUtils.expectLoadingStarted(getOwnerFormItem())
const expectOwnerLoadingFinished = () => selectTestUtils.expectLoadingFinished(getOwnerFormItem())

// location field
const getLocationFormItem = () => within(getContainer()).getByTestId('location-form-item')
const getLocationLabel = () => within(getLocationFormItem()).getByLabelText('Местонахождение')
const getLocationSelectInput = () => selectTestUtils.getSelect(getLocationFormItem())
const setLocation = selectTestUtils.clickSelectOption
const findLocationError = async (error: string) => within(getLocationFormItem()).findByText(error)

const getSelectedLocation = (value: string) => within(getLocationFormItem()).getByTitle(value)

const openLocationSelect = async (user: UserEvent) =>
  selectTestUtils.openSelect(user, getLocationFormItem())

const expectLocationLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getLocationFormItem())

// macroregion field
const getMacroregionFormItem = () => within(getContainer()).getByTestId('macroregion-form-item')
const queryMacroregionFormItem = () => within(getContainer()).queryByTestId('macroregion-form-item')
const getMacroregionLabel = () => within(getMacroregionFormItem()).getByLabelText('Макрорегион')
const getMacroregionSelectInput = () => selectTestUtils.getSelect(getMacroregionFormItem())
const setMacroregion = selectTestUtils.clickSelectOption
const findMacroregionError = (error: string): Promise<HTMLElement> =>
  within(getMacroregionFormItem()).findByText(error)

const getSelectedMacroregion = (value: string): HTMLElement =>
  within(getMacroregionFormItem()).getByTitle(value)

const openMacroregionSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getMacroregionFormItem())
}

const expectMacroregionLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getMacroregionFormItem())

// purpose field
const getPurposeFormItem = () => within(getContainer()).getByTestId('purpose-form-item')
const getPurposeLabel = () => within(getPurposeFormItem()).getByLabelText('Назначение оборудования')
const getPurposeSelectInput = () => selectTestUtils.getSelect(getPurposeFormItem())
const setPurpose = selectTestUtils.clickSelectOption
const getPurposeOption = selectTestUtils.getSelectOption

const getSelectedPurpose = (value: string): HTMLElement =>
  within(getPurposeFormItem()).getByTitle(value)

const querySelectedPurpose = (value: string): MaybeNull<HTMLElement> =>
  within(getPurposeFormItem()).queryByTitle(value)

const openPurposeSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getPurposeFormItem())
}

const findPurposeError = (error: string): Promise<HTMLElement> =>
  within(getPurposeFormItem()).findByText(error)

const expectPurposeLoadingStarted = () => selectTestUtils.expectLoadingStarted(getPurposeFormItem())

const expectPurposeLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getPurposeFormItem())

// comment field
const getCommentFormItem = () => within(getContainer()).getByTestId('comment-form-item')
const getCommentLabel = () => within(getCommentFormItem()).getByLabelText('Комментарий')

const getCommentField = () =>
  within(getCommentFormItem()).getByPlaceholderText('Добавьте комментарий')

const setComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

export const checkEquipmentFormModalTestUtils = {
  getContainer,
  findContainer,

  getSaveButton,
  clickSaveButton,

  getCategoryFormItem,
  getCategorySelectInput,
  setCategory,
  getCategoryOption,
  getSelectedCategory,
  querySelectedCategory,
  openCategorySelect,
  findCategoryError,
  expectCategoryLoadingStarted,
  expectCategoryLoadingFinished,

  getNomenclatureLabel,
  getNomenclatureSelectInput,
  setNomenclature,
  getNomenclatureOption,
  getSelectedNomenclature,
  querySelectedNomenclature,
  openNomenclatureSelect,
  findNomenclatureError,
  expectNomenclaturesLoadingStarted,
  expectNomenclaturesLoadingFinished,
  expectNomenclatureLoadingStarted,
  expectNomenclatureLoadingFinished,

  getTitleLabel,
  getTitleField,
  setTitle,
  findTitleError,

  queryInventoryNumberFormItem,
  getInventoryNumberLabel,
  getInventoryNumberField,
  setInventoryNumber,

  querySerialNumberFormItem,
  getSerialNumberLabel,
  getSerialNumberField,
  setSerialNumber,
  findSerialNumberError,

  getConditionLabel,
  getConditionSelectInput,
  setCondition,
  getConditionOption,
  getSelectedCondition,
  querySelectedCondition,
  openConditionSelect,
  findConditionError,

  queryQuantityFormItem,
  getQuantityLabel,
  getQuantityField,
  setQuantity,
  findQuantityError,

  queryMeasurementUnitFormItem,
  getMeasurementUnitLabel,

  getPriceLabel,
  getPriceField,
  setPrice,

  getCurrencyLabel,
  getCurrencySelectInput,
  setCurrency,
  getCurrencyOption,
  getSelectedCurrency,
  openCurrencySelect,
  expectCurrencyLoadingStarted,
  expectCurrencyLoadingFinished,

  queryIsNewFormItem,
  getIsNewField,
  clickIsNewField,
  findIsNewError,

  queryIsWarrantyFormItem,
  getIsWarrantyField,
  clickIsWarrantyField,
  findIsWarrantyError,

  queryIsRepairedFormItem,
  getIsRepairedField,
  clickIsRepairedField,
  findIsRepairedError,

  queryUsageCounterFormItem,
  getUsageCounterLabel,
  getUsageCounterField,
  setUsageCounter,

  queryOwnerFormItem,
  getOwnerLabel,
  getOwnerSelectInput,
  setOwner,
  getOwnerOption,
  findOwnerError,
  getSelectedOwner,
  openOwnerSelect,
  expectOwnerLoadingStarted,
  expectOwnerLoadingFinished,

  getLocationLabel,
  getLocationSelectInput,
  setLocation,
  findLocationError,
  getSelectedLocation,
  openLocationSelect,
  expectLocationLoadingFinished,

  queryMacroregionFormItem,
  getMacroregionLabel,
  getMacroregionSelectInput,
  setMacroregion,
  findMacroregionError,
  getSelectedMacroregion,
  openMacroregionSelect,
  expectMacroregionLoadingFinished,

  getPurposeLabel,
  getPurposeSelectInput,
  setPurpose,
  getPurposeOption,
  getSelectedPurpose,
  querySelectedPurpose,
  openPurposeSelect,
  findPurposeError,
  expectPurposeLoadingStarted,
  expectPurposeLoadingFinished,

  getCommentLabel,
  getCommentField,
  setComment,
}
