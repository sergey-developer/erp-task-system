import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  EquipmentCategoryEnum,
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'

import { CANCEL_TEXT } from 'shared/constants/common'
import { yesNoOptions } from 'shared/constants/selectField'
import { validationMessages } from 'shared/constants/validation'
import { MaybeNull } from 'shared/types/utils'

import currencyFixtures from '_tests_/fixtures/currency'
import macroregionFixtures from '_tests_/fixtures/macroregion'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  buttonTestUtils,
  fakeInteger,
  fakeWord,
  radioButtonTestUtils,
  render,
  selectTestUtils,
  spinnerTestUtils,
} from '_tests_/utils'

import EquipmentFormModal from './index'
import { EquipmentFormModalProps } from './types'

const props: Readonly<EquipmentFormModalProps> = {
  open: true,
  mode: 'create',
  title: fakeWord(),
  isLoading: false,
  okText: fakeWord(),

  onCancel: jest.fn(),
  onSubmit: jest.fn(),

  onUploadImage: jest.fn(),
  imageIsUploading: false,
  onDeleteImage: jest.fn(),
  imageIsDeleting: false,

  nomenclature: warehouseFixtures.nomenclature(),
  nomenclatureIsLoading: false,

  nomenclatures: [],
  nomenclaturesIsLoading: false,
  onChangeNomenclature: jest.fn(),

  categories: [],
  categoriesIsLoading: false,
  category: warehouseFixtures.equipmentCategoryListItem(),
  onChangeCategory: jest.fn(),

  currencies: [],
  currenciesIsLoading: false,

  owners: [],
  ownersIsLoading: false,
  onChangeOwner: jest.fn(),

  macroregions: [],
  macroregionsIsLoading: false,

  workTypes: [],
  workTypesIsLoading: false,

  warehouses: [],
  warehousesIsLoading: false,
}

const addModeProps: Readonly<Pick<EquipmentFormModalProps, 'okText'>> = {
  okText: 'Добавить',
}

const getContainer = () => screen.getByTestId('equipment-form-modal')
const findContainer = (): Promise<HTMLElement> => screen.findByTestId('equipment-form-modal')

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

const expectNomenclatureLoadingStarted = () =>
  spinnerTestUtils.expectLoadingStarted('nomenclature-loading')

const expectNomenclatureLoadingFinished = () =>
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

// owner is obermeister field
const getOwnerIsObermeisterFormItem = () =>
  within(getContainer()).getByTestId('owner-is-obermeister-form-item')

const queryOwnerIsObermeisterFormItem = () =>
  within(getContainer()).queryByTestId('owner-is-obermeister-form-item')

const getOwnerIsObermeisterField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getOwnerIsObermeisterFormItem(), text)

const clickOwnerIsObermeisterField = async (user: UserEvent, text: string) => {
  const field = getOwnerIsObermeisterField(text)
  await user.click(field)
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

// macroregion field
const getMacroregionFormItem = () => within(getContainer()).getByTestId('macroregion-form-item')
const queryMacroregionFormItem = () => within(getContainer()).queryByTestId('macroregion-form-item')
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

// images
const getImagesFormItem = () => within(getContainer()).getByTestId('images-form-item')
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

export const testUtils = {
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

describe('Модалка оборудования', () => {
  describe('Категория', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = within(testUtils.getCategoryFormItem()).getByLabelText('Категория')
      const input = testUtils.getCategorySelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      const { user } = render(<EquipmentFormModal {...props} categories={[category]} />)

      await testUtils.openCategorySelect(user)
      await testUtils.setCategory(user, category.title)
      const selectedCategory = testUtils.getSelectedCategory(category.title)

      expect(selectedCategory).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await testUtils.clickAddButton(user)
      const error = await testUtils.findCategoryError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Номенклатура', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getNomenclatureLabel()
      const input = testUtils.getNomenclatureSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const nomenclature = warehouseFixtures.nomenclatureListItem()
      const { user } = render(<EquipmentFormModal {...props} nomenclatures={[nomenclature]} />)

      await testUtils.openNomenclatureSelect(user)
      await testUtils.setNomenclature(user, nomenclature.title)
      const selectedNomenclature = testUtils.getSelectedNomenclature(nomenclature.title)

      expect(selectedNomenclature).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await testUtils.clickAddButton(user)
      const error = await testUtils.findNomenclatureError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Наименование', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getTitleLabel()
      const field = testUtils.getTitleField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setTitle(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const field = testUtils.getTitleField()
      expect(field).toBeDisabled()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await testUtils.clickAddButton(user)
      const error = await testUtils.findTitleError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getInventoryNumberLabel()
      const field = testUtils.getInventoryNumberField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryInventoryNumberFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setInventoryNumber(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Серийный номер', () => {
    test('Отображается если условия соблюдены', () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })

      render(<EquipmentFormModal {...props} nomenclature={nomenclature} />)

      const label = testUtils.getSerialNumberLabel()
      const field = testUtils.getSerialNumberField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если у оборудования нет серийного номера', () => {
      render(<EquipmentFormModal {...props} />)

      const formItem = testUtils.querySerialNumberFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })

      const { user } = render(<EquipmentFormModal {...props} nomenclature={nomenclature} />)

      const value = fakeWord()
      const field = await testUtils.setSerialNumber(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })

      const { user } = render(
        <EquipmentFormModal {...props} {...addModeProps} nomenclature={nomenclature} />,
      )

      await testUtils.clickAddButton(user)
      const error = await testUtils.findSerialNumberError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  // describe('Склад', () => {})

  describe('Состояние', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getConditionLabel()
      const input = testUtils.getConditionSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = equipmentConditionDict[EquipmentConditionEnum.Working]
      await testUtils.openConditionSelect(user)
      await testUtils.setCondition(user, value)
      const selectedCondition = testUtils.getSelectedCondition(value)

      expect(selectedCondition).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await testUtils.clickAddButton(user)
      const error = await testUtils.findConditionError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Количество', () => {
    describe('Режим создания', () => {
      test('Отображается если категория расходный материал', () => {
        const category = warehouseFixtures.equipmentCategoryListItem({
          code: EquipmentCategoryEnum.Consumable,
        })

        render(<EquipmentFormModal {...props} category={category} />)

        const label = testUtils.getQuantityLabel()
        const field = testUtils.getQuantityField()

        expect(label).toBeInTheDocument()
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не отображается если категория не расходный материал', () => {
        render(<EquipmentFormModal {...props} />)

        const formItem = testUtils.queryQuantityFormItem()
        expect(formItem).not.toBeInTheDocument()
      })

      test('Можно установить значение', async () => {
        const category = warehouseFixtures.equipmentCategoryListItem({
          code: EquipmentCategoryEnum.Consumable,
        })

        const { user } = render(<EquipmentFormModal {...props} category={category} />)

        const value = fakeInteger()
        const field = await testUtils.setQuantity(user, value)

        expect(field).toHaveDisplayValue(String(value))
      })

      test('Показывается ошибка если поле не заполнено', async () => {
        const category = warehouseFixtures.equipmentCategoryListItem({
          code: EquipmentCategoryEnum.Consumable,
        })

        const { user } = render(
          <EquipmentFormModal {...props} category={category} {...addModeProps} />,
        )

        await testUtils.clickAddButton(user)
        const error = await testUtils.findQuantityError(validationMessages.required)

        expect(error).toBeInTheDocument()
      })
    })

    describe('Режим редактирования', () => {
      test('Отображается если категория расходный материал', () => {
        const category = warehouseFixtures.equipmentCategoryListItem({
          code: EquipmentCategoryEnum.Consumable,
        })

        render(<EquipmentFormModal {...props} category={category} mode='edit' />)

        const label = testUtils.getQuantityLabel()
        const field = testUtils.getQuantityField()

        expect(label).toBeInTheDocument()
        expect(field).toBeInTheDocument()
        expect(field).toBeDisabled()
        expect(field).not.toHaveValue()
      })

      test('Не отображается если категория не расходный материал', () => {
        render(<EquipmentFormModal {...props} mode='edit' />)
        const formItem = testUtils.queryQuantityFormItem()
        expect(formItem).not.toBeInTheDocument()
      })
    })
  })

  describe('Ед.измерения', () => {
    test('Отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const label = testUtils.getMeasurementUnitLabel()
      expect(label).toBeInTheDocument()
    })

    test('Не отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      const formItem = testUtils.queryMeasurementUnitFormItem()
      expect(formItem).not.toBeInTheDocument()
    })
  })

  describe('Стоимость', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getPriceLabel()
      const field = testUtils.getPriceField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeInteger()
      const field = await testUtils.setPrice(user, value)

      expect(field).toHaveDisplayValue(String(value))
    })
  })

  describe('Валюта', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getCurrencyLabel()
      const input = testUtils.getCurrencySelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const currency = currencyFixtures.currencyListItem()

      const { user } = render(<EquipmentFormModal {...props} currencies={[currency]} />)

      await testUtils.openCurrencySelect(user)
      await testUtils.setCurrency(user, currency.title)
      const selectedCurrency = testUtils.getSelectedCurrency(currency.title)

      expect(selectedCurrency).toBeInTheDocument()
    })
  })

  describe('Новое', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getIsNewField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryIsNewFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const field = await testUtils.clickIsNewField(user, yesNoOptions[0].label as string)
      expect(field).toBeChecked()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await testUtils.clickAddButton(user)

      const error = await testUtils.findIsNewError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('На гарантии', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getIsWarrantyField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryIsWarrantyFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const field = await testUtils.clickIsWarrantyField(user, yesNoOptions[0].label as string)
      expect(field).toBeChecked()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await testUtils.clickAddButton(user)

      const error = await testUtils.findIsWarrantyError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Отремонтированное', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getIsRepairedField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryIsRepairedFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const field = await testUtils.clickIsRepairedField(user, yesNoOptions[0].label as string)
      expect(field).toBeChecked()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await testUtils.clickAddButton(user)

      const error = await testUtils.findIsRepairedError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Счетчик пробега текущий', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getUsageCounterLabel()
      const field = testUtils.getUsageCounterField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })
      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryUsageCounterFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeInteger()
      const field = await testUtils.setUsageCounter(user, value)

      expect(field).toHaveDisplayValue(String(value))
    })
  })

  describe('Владелец оборудования - Obermeister', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getOwnerIsObermeisterField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryOwnerIsObermeisterFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)
      const field = await testUtils.clickOwnerIsObermeisterField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })
  })

  describe('Владелец оборудования', () => {
    test('Отображается если категория не расходный материал и поле "владелец оборудования Obermeister" не заполнено', () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getOwnerLabel()
      const input = testUtils.getOwnerSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Отображается если категория не расходный материал и в поле "владелец оборудования Obermeister" выбрано "Нет"', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      await testUtils.clickOwnerIsObermeisterField(user, 'Нет')
      const label = testUtils.getOwnerLabel()
      const input = testUtils.getOwnerSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })
      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryOwnerFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Не отображается если в поле "владелец оборудования Obermeister" выбрано "Да"', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      await testUtils.clickOwnerIsObermeisterField(user, 'Да')
      const formItem = testUtils.queryOwnerFormItem()

      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const owner = warehouseFixtures.customerListItem()
      const { user } = render(<EquipmentFormModal {...props} owners={[owner]} />)

      await testUtils.openOwnerSelect(user)
      await testUtils.setOwner(user, owner.title)
      const selectedOwner = testUtils.getSelectedOwner(owner.title)

      expect(selectedOwner).toBeInTheDocument()
    })

    test('Обязательно для заполнения если в поле "владелец оборудования Obermeister" выбрано "Нет"', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await testUtils.clickOwnerIsObermeisterField(user, 'Нет')
      await testUtils.clickAddButton(user)
      const notification = await testUtils.findOwnerError(validationMessages.required)

      expect(notification).toBeInTheDocument()
    })
  })

  describe('Макрорегион', () => {
    test('Отображается если выбран владелец оборудования', async () => {
      const owner = warehouseFixtures.customerListItem()
      const { user } = render(<EquipmentFormModal {...props} owners={[owner]} />)

      await testUtils.openOwnerSelect(user)
      await testUtils.setOwner(user, owner.title)
      const label = testUtils.getMacroregionLabel()
      const input = testUtils.getMacroregionSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Не отображается если не выбран владелец оборудования', () => {
      render(<EquipmentFormModal {...props} />)
      const formItem = testUtils.queryMacroregionFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const owner = warehouseFixtures.customerListItem()
      const macroregionListItem = macroregionFixtures.macroregionListItem()

      const { user } = render(
        <EquipmentFormModal {...props} macroregions={[macroregionListItem]} owners={[owner]} />,
      )

      await testUtils.openOwnerSelect(user)
      await testUtils.setOwner(user, owner.title)

      await testUtils.openMacroregionSelect(user)
      await testUtils.setMacroregion(user, macroregionListItem.title)
      const selectedOption = testUtils.getSelectedMacroregion(macroregionListItem.title)

      expect(selectedOption).toBeInTheDocument()
    })

    test('Обязательно для заполнения если в поле "владелец оборудования Obermeister" выбрано "Нет"', async () => {
      const owner = warehouseFixtures.customerListItem()

      const { user } = render(<EquipmentFormModal {...props} owners={[owner]} {...addModeProps} />)

      await testUtils.clickOwnerIsObermeisterField(user, 'Нет')
      await testUtils.openOwnerSelect(user)
      await testUtils.setOwner(user, owner.title)
      await testUtils.clickAddButton(user)
      const error = await testUtils.findMacroregionError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Назначение оборудования', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getPurposeLabel()
      const input = testUtils.getPurposeSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const workType = warehouseFixtures.workTypeListItem()
      const { user } = render(<EquipmentFormModal {...props} workTypes={[workType]} />)

      await testUtils.openPurposeSelect(user)
      await testUtils.setPurpose(user, workType.title)
      const selectedPurpose = testUtils.getSelectedPurpose(workType.title)

      expect(selectedPurpose).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await testUtils.clickAddButton(user)
      const error = await testUtils.findPurposeError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Комментарий', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getCommentLabel()
      const field = testUtils.getCommentField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setComment(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Изображения оборудования', () => {
    test('Кнопка и заголовок отображаются', async () => {
      render(<EquipmentFormModal {...props} />)

      const label = testUtils.getImagesLabel()
      const button = testUtils.getAddImagesButton()

      expect(label).toBeInTheDocument()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Загрузка работает корректно', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const { input, file } = await testUtils.setImage(user)
      const uploadedImage = testUtils.getUploadedImage(file.name)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedImage).toBeInTheDocument()
      expect(props.onUploadImage).toBeCalledTimes(1)
      expect(props.onUploadImage).toBeCalledWith(expect.anything())
    })

    test('Удаление работает корректно', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      await testUtils.setImage(user)
      await testUtils.clickDeleteImageButton(user)

      expect(props.onDeleteImage).toBeCalledTimes(1)
      expect(props.onDeleteImage).toBeCalledWith(expect.anything())
    })

    test('Кнопка и зона загрузки не активны во время загрузки', () => {
      render(<EquipmentFormModal {...props} isLoading />)

      const button = testUtils.getAddImagesButton()
      const input = testUtils.getAddImagesInput()

      expect(button).toBeDisabled()
      expect(input).toBeDisabled()
    })

    test('Зона загрузки не активна во время удаления изображения', () => {
      render(<EquipmentFormModal {...props} imageIsDeleting />)

      const input = testUtils.getAddImagesInput()
      expect(input).toBeDisabled()
    })
  })
})
