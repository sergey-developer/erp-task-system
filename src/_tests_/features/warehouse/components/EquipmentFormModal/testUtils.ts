import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT } from 'shared/constants/common'
import { MaybeNull } from 'shared/types/utils'

import { TestIdsEnum } from '_tests_/features/warehouse/components/EquipmentFormModal/constants'
import {
  buttonTestUtils,
  fakeWord,
  radioButtonTestUtils,
  selectTestUtils,
  spinnerTestUtils,
} from '_tests_/utils/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.EquipmentFormModal)
const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId(TestIdsEnum.EquipmentFormModal)

// add button
const getAddButton = () => buttonTestUtils.getButtonIn(getContainer(), new RegExp(/^Добавить$/))

const clickAddButton = async (user: UserEvent) => {
  const button = getAddButton()
  await user.click(button)
}

// edit button
const getEditButton = () => buttonTestUtils.getButtonIn(getContainer(), new RegExp(/^Сохранить$/))

const clickEditButton = async (user: UserEvent) => {
  const button = getEditButton()
  await user.click(button)
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

// category field
const getCategoryFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.CategoryFormItem)
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
const getNomenclatureFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.NomenclaturesFormItem)
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
const getTitleFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.TitleFormItem)
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
  within(getContainer()).getByTestId(TestIdsEnum.InventoryNumberFormItem)

const queryInventoryNumberFormItem = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.InventoryNumberFormItem)

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
const getSerialNumberFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.SerialNumberFormItem)

const querySerialNumberFormItem = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.SerialNumberFormItem)

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
const getConditionFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.ConditionFormItem)
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
const getQuantityFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.QuantityFormItem)
const queryQuantityFormItem = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.QuantityFormItem)
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
  within(getContainer()).getByTestId(TestIdsEnum.MeasurementUnitFormItem)

const queryMeasurementUnitFormItem = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.MeasurementUnitFormItem)

const getMeasurementUnitLabel = () => within(getMeasurementUnitFormItem()).getByText('Ед.измерения')

// price field
const getPriceFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.PriceFormItem)
const getPriceLabel = () => within(getPriceFormItem()).getByLabelText('Стоимость')
const getPriceField = () => within(getPriceFormItem()).getByPlaceholderText('Введите стоимость')

const setPrice = async (user: UserEvent, value: number) => {
  const field = getPriceField()
  await user.type(field, String(value))
  return field
}

// currency field
const getCurrencyFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.CurrencyFormItem)
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
const getIsNewFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.IsNewFormItem)
const queryIsNewFormItem = () => within(getContainer()).queryByTestId(TestIdsEnum.IsNewFormItem)

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
const getIsWarrantyFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.IsWarrantyFormItem)
const queryIsWarrantyFormItem = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.IsWarrantyFormItem)

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
const getIsRepairedFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.IsRepairedFormItem)
const queryIsRepairedFormItem = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.IsRepairedFormItem)

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
const getUsageCounterFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.UsageCounterFormItem)

const queryUsageCounterFormItem = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.UsageCounterFormItem)

const getUsageCounterLabel = () =>
  within(getUsageCounterFormItem()).getByLabelText('Счетчик пробега текущий')

const getUsageCounterField = () =>
  within(getUsageCounterFormItem()).getByPlaceholderText('Введите значение')

const setUsageCounter = async (user: UserEvent, value: number) => {
  const field = getUsageCounterField()
  await user.type(field, String(value))
  return field
}

// owner is obermeister field
const getOwnerIsObermeisterFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.OwnerIsObermeisterFormItem)

const queryOwnerIsObermeisterFormItem = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.OwnerIsObermeisterFormItem)

const getOwnerIsObermeisterField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getOwnerIsObermeisterFormItem(), text)

const clickOwnerIsObermeisterField = async (user: UserEvent, text: string) => {
  const field = getOwnerIsObermeisterField(text)
  await user.click(field)
  return field
}

// owner field
const getOwnerFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.OwnerFormItem)
const queryOwnerFormItem = () => within(getContainer()).queryByTestId(TestIdsEnum.OwnerFormItem)
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

// macroregion field
const getMacroregionFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.MacroregionFormItem)
const queryMacroregionFormItem = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.MacroregionFormItem)
const getMacroregionLabel = () => within(getMacroregionFormItem()).getByLabelText('Макрорегион')
const getMacroregionSelectInput = () => selectTestUtils.getSelect(getMacroregionFormItem())
const setMacroregion = selectTestUtils.clickSelectOption
const getMacroregionOption = selectTestUtils.getSelectOption
const findMacroregionError = (error: string): Promise<HTMLElement> =>
  within(getMacroregionFormItem()).findByText(error)

const getSelectedMacroregion = (value: string): HTMLElement =>
  within(getMacroregionFormItem()).getByTitle(value)

const openMacroregionSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getMacroregionFormItem())
}

const expectMacroregionLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getMacroregionFormItem())
const expectMacroregionLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getMacroregionFormItem())

// purpose field
const getPurposeFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.PurposeFormItem)
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
const getCommentFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.CommentFormItem)
const getCommentLabel = () => within(getCommentFormItem()).getByLabelText('Комментарий')

const getCommentField = () =>
  within(getCommentFormItem()).getByPlaceholderText('Добавьте комментарий')

const setComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

// images
const getImagesFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.ImagesFormItem)
const getImagesLabel = () => within(getImagesFormItem()).getByLabelText('Изображения оборудования')
const getUploadedImage = (filename: string) => within(getImagesFormItem()).getByTitle(filename)
const queryUploadedImage = (filename: string) => within(getImagesFormItem()).queryByTitle(filename)
const findImagesError = (error: string) => within(getImagesFormItem()).findByText(error)

const clickDeleteImageButton = async (user: UserEvent) => {
  const button = buttonTestUtils.getButtonIn(getImagesFormItem(), 'delete')
  await user.click(button)
}

const getAddImagesButton = () => buttonTestUtils.getButtonIn(getImagesFormItem(), /Добавить фото/)

const getAddImagesInput = () => {
  const formItem = getImagesFormItem()
  // eslint-disable-next-line testing-library/no-node-access
  return formItem.querySelector('input[type="file"]') as HTMLInputElement
}

const clickAddImagesButton = async (user: UserEvent) => {
  const button = getAddImagesButton()
  await user.click(button)
}

const setImage = async (
  user: UserEvent,
  file: File = new File([], fakeWord(), { type: 'image/png' }),
) => {
  const input = getAddImagesInput()
  await user.upload(input, file)
  return { input, file }
}

export const equipmentFormModalTestUtils = {
  getContainer,
  findContainer,

  getAddButton,
  clickAddButton,

  getEditButton,
  clickEditButton,

  getCancelButton,
  clickCancelButton,

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

  getOwnerIsObermeisterField,
  queryOwnerIsObermeisterFormItem,
  clickOwnerIsObermeisterField,

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

  queryMacroregionFormItem,
  getMacroregionLabel,
  getMacroregionSelectInput,
  setMacroregion,
  getMacroregionOption,
  findMacroregionError,
  getSelectedMacroregion,
  openMacroregionSelect,
  expectMacroregionLoadingStarted,
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

  getImagesLabel,
  getUploadedImage,
  queryUploadedImage,
  findImagesError,
  getAddImagesButton,
  getAddImagesInput,
  clickAddImagesButton,
  clickDeleteImageButton,
  setImage,
}
