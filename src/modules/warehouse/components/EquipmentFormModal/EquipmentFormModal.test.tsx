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
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  buttonTestUtils,
  fakeInteger,
  fakeWord,
  radioButtonTestUtils,
  render,
  selectTestUtils,
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

  nomenclatureIsLoading: false,

  nomenclatureList: [],
  nomenclatureListIsLoading: false,
  onChangeNomenclature: jest.fn(),

  categoryList: [],
  categoryListIsLoading: false,
  onChangeCategory: jest.fn(),

  currencyList: [],
  currencyListIsLoading: false,

  ownerList: [],
  ownerListIsLoading: false,

  workTypeList: [],
  workTypeListIsLoading: false,

  warehouseList: [],
  warehouseListIsLoading: false,
}

const addModeProps: Readonly<Pick<EquipmentFormModalProps, 'okText'>> = {
  okText: 'Добавить',
}

const editModeProps: Readonly<Pick<EquipmentFormModalProps, 'okText'>> = {
  okText: 'Сохранить',
}

const getContainer = () => screen.getByTestId('equipment-form-modal')

const findContainer = (): Promise<HTMLElement> => screen.findByTestId('equipment-form-modal')

// add button
const getAddButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), new RegExp(addModeProps.okText as string))

const clickAddButton = async (user: UserEvent) => {
  const button = getAddButton()
  await user.click(button)
}

// edit button
const getEditButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), new RegExp(editModeProps.okText as string))

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

const getCategoryLabel = () => within(getCategoryFormItem()).getByLabelText('Категория')

const getCategorySelectInput = (opened?: boolean) =>
  selectTestUtils.getSelect(getCategoryFormItem(), { name: 'Категория', expanded: opened })

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
const getNomenclatureFormItem = () => within(getContainer()).getByTestId('nomenclature-form-item')

const getNomenclatureLabel = () => within(getNomenclatureFormItem()).getByLabelText('Номенклатура')

const getNomenclatureSelectInput = (opened?: boolean) =>
  selectTestUtils.getSelect(getNomenclatureFormItem(), { name: 'Номенклатура', expanded: opened })

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

const expectNomenclatureLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getNomenclatureFormItem())

const expectNomenclatureLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getNomenclatureFormItem())

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

// customer inventory number field
const getCustomerInventoryNumberFormItem = () =>
  within(getContainer()).getByTestId('customer-inventory-number-form-item')

const queryCustomerInventoryNumberFormItem = () =>
  within(getContainer()).queryByTestId('customer-inventory-number-form-item')

const getCustomerInventoryNumberLabel = () =>
  within(getCustomerInventoryNumberFormItem()).getByLabelText('Инвентарный номер заказчика')

const getCustomerInventoryNumberField = () =>
  within(getCustomerInventoryNumberFormItem()).getByPlaceholderText(
    'Введите инвентарный номер заказчика',
  )

const setCustomerInventoryNumber = async (user: UserEvent, value: string) => {
  const field = getCustomerInventoryNumberField()
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

const getConditionSelectInput = (opened?: boolean) =>
  selectTestUtils.getSelect(getConditionFormItem(), { name: 'Состояние', expanded: opened })

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

const getCurrencySelectInput = (opened?: boolean) =>
  selectTestUtils.getSelect(getCurrencyFormItem(), { name: 'Валюта', expanded: opened })

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

const getOwnerSelectInput = (opened?: boolean) =>
  selectTestUtils.getSelect(getOwnerFormItem(), { name: 'Владелец оборудования', expanded: opened })

const setOwner = selectTestUtils.clickSelectOption

const getOwnerOption = selectTestUtils.getSelectOption

const getSelectedOwner = (value: string): HTMLElement =>
  within(getOwnerFormItem()).getByTitle(value)

const openOwnerSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getOwnerFormItem())
}

const expectOwnerLoadingStarted = () => selectTestUtils.expectLoadingStarted(getOwnerFormItem())

const expectOwnerLoadingFinished = () => selectTestUtils.expectLoadingFinished(getOwnerFormItem())

// purpose field
const getPurposeFormItem = () => within(getContainer()).getByTestId('purpose-form-item')

const getPurposeLabel = () => within(getPurposeFormItem()).getByLabelText('Назначение оборудования')

const getPurposeSelectInput = (opened?: boolean) =>
  selectTestUtils.getSelect(getPurposeFormItem(), {
    name: 'Назначение оборудования',
    expanded: opened,
  })

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

const getAddImagesButton = () =>
  buttonTestUtils.getAllButtonIn(getImagesFormItem(), /Добавить фото/)[1]

const getAddImagesInput = () => {
  const button = buttonTestUtils.getAllButtonIn(getImagesFormItem(), /Добавить фото/)[0]
  // eslint-disable-next-line testing-library/no-node-access
  return button.querySelector('input[type="file"]') as HTMLInputElement
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

  getCategoryLabel,
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
  expectNomenclatureLoadingStarted,
  expectNomenclatureLoadingFinished,

  getTitleLabel,
  getTitleField,
  setTitle,
  findTitleError,

  queryCustomerInventoryNumberFormItem,
  getCustomerInventoryNumberLabel,
  getCustomerInventoryNumberField,
  setCustomerInventoryNumber,

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
  getSelectedOwner,
  openOwnerSelect,
  expectOwnerLoadingStarted,
  expectOwnerLoadingFinished,

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

      const label = testUtils.getCategoryLabel()
      const input = testUtils.getCategorySelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      const { user } = render(<EquipmentFormModal {...props} categoryList={[category]} />)

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
      const { user } = render(<EquipmentFormModal {...props} nomenclatureList={[nomenclature]} />)

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
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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

  describe('Инвентарный номер заказчика', () => {
    test('Отображается если категория не расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

      const label = testUtils.getCustomerInventoryNumberLabel()
      const field = testUtils.getCustomerInventoryNumberField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

      const formItem = testUtils.queryCustomerInventoryNumberFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setCustomerInventoryNumber(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Серийный номер', () => {
    test('Отображается если условия соблюдены', () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })
      const category = warehouseFixtures.equipmentCategoryListItem()
      render(
        <EquipmentFormModal {...props} nomenclature={nomenclature} selectedCategory={category} />,
      )

      const label = testUtils.getSerialNumberLabel()
      const field = testUtils.getSerialNumberField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если у оборудования нет серийного номера', () => {
      const nomenclature = warehouseFixtures.nomenclature()
      const category = warehouseFixtures.equipmentCategoryListItem()
      render(
        <EquipmentFormModal {...props} nomenclature={nomenclature} selectedCategory={category} />,
      )

      const formItem = testUtils.querySerialNumberFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Не отображается если категория расходный материал', () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })
      render(
        <EquipmentFormModal {...props} nomenclature={nomenclature} selectedCategory={category} />,
      )

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
        render(<EquipmentFormModal {...props} selectedCategory={category} />)

        const label = testUtils.getQuantityLabel()
        const field = testUtils.getQuantityField()

        expect(label).toBeInTheDocument()
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не отображается если категория не расходный материал', () => {
        const category = warehouseFixtures.equipmentCategoryListItem()
        render(<EquipmentFormModal {...props} selectedCategory={category} />)

        const formItem = testUtils.queryQuantityFormItem()
        expect(formItem).not.toBeInTheDocument()
      })

      test('Можно установить значение', async () => {
        const category = warehouseFixtures.equipmentCategoryListItem({
          code: EquipmentCategoryEnum.Consumable,
        })
        const { user } = render(<EquipmentFormModal {...props} selectedCategory={category} />)

        const value = fakeInteger()
        const field = await testUtils.setQuantity(user, value)

        expect(field).toHaveDisplayValue(String(value))
      })
    })

    describe('Режим редактирования', () => {
      test('Отображается корректно', () => {
        render(<EquipmentFormModal {...props} mode='edit' />)

        const label = testUtils.getQuantityLabel()
        const field = testUtils.getQuantityField()

        expect(label).toBeInTheDocument()
        expect(field).toBeInTheDocument()
        expect(field).toBeDisabled()
        expect(field).not.toHaveValue()
      })
    })
  })

  describe('Ед.измерения', () => {
    test('Отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

      const label = testUtils.getMeasurementUnitLabel()
      expect(label).toBeInTheDocument()
    })

    test('Не отображается если категория не расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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
      const { user } = render(<EquipmentFormModal {...props} currencyList={[currency]} />)

      await testUtils.openCurrencySelect(user)
      await testUtils.setCurrency(user, currency.title)
      const selectedCurrency = testUtils.getSelectedCurrency(currency.title)

      expect(selectedCurrency).toBeInTheDocument()
    })
  })

  describe('Новое', () => {
    test('Отображается если категория не расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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
      const category = warehouseFixtures.equipmentCategoryListItem()
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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
      const category = warehouseFixtures.equipmentCategoryListItem()
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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
      const category = warehouseFixtures.equipmentCategoryListItem()
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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

  describe('Владелец оборудования', () => {
    test('Отображается если категория не расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

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
      render(<EquipmentFormModal {...props} selectedCategory={category} />)

      const formItem = testUtils.queryOwnerFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const owner = warehouseFixtures.customerListItem()
      const { user } = render(<EquipmentFormModal {...props} ownerList={[owner]} />)

      await testUtils.openOwnerSelect(user)
      await testUtils.setOwner(user, owner.title)
      const selectedOwner = testUtils.getSelectedOwner(owner.title)

      expect(selectedOwner).toBeInTheDocument()
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
      const { user } = render(<EquipmentFormModal {...props} workTypeList={[workType]} />)

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
    test('Отображается корректно', async () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      const nomenclature = warehouseFixtures.nomenclature()

      render(
        <EquipmentFormModal {...props} selectedCategory={category} nomenclature={nomenclature} />,
      )

      const label = testUtils.getImagesLabel()
      const button = testUtils.getAddImagesButton()

      expect(label).toBeInTheDocument()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Загрузка работает корректно', async () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      const nomenclature = warehouseFixtures.nomenclature()

      const { user } = render(
        <EquipmentFormModal {...props} selectedCategory={category} nomenclature={nomenclature} />,
      )

      const { input, file } = await testUtils.setImage(user)
      const uploadedImage = testUtils.getUploadedImage(file.name)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedImage).toBeInTheDocument()
      expect(props.onUploadImage).toBeCalledTimes(1)
      expect(props.onUploadImage).toBeCalledWith(expect.anything())
    })

    test('Удаление работает корректно', async () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      const nomenclature = warehouseFixtures.nomenclature()

      const { user } = render(
        <EquipmentFormModal {...props} selectedCategory={category} nomenclature={nomenclature} />,
      )

      await testUtils.setImage(user)
      await testUtils.clickDeleteImageButton(user)

      expect(props.onDeleteImage).toBeCalledTimes(1)
      expect(props.onDeleteImage).toBeCalledWith(expect.anything())
    })

    test('Кнопка и зона загрузки не активны во время загрузки', () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      const nomenclature = warehouseFixtures.nomenclature()

      render(
        <EquipmentFormModal
          {...props}
          selectedCategory={category}
          nomenclature={nomenclature}
          isLoading
        />,
      )

      const button = testUtils.getAddImagesButton()
      const input = testUtils.getAddImagesInput()

      expect(button).toBeDisabled()
      expect(input).toBeDisabled()
    })

    test('Зона загрузки не активна во время удаления изображения', () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      const nomenclature = warehouseFixtures.nomenclature()

      render(
        <EquipmentFormModal
          {...props}
          selectedCategory={category}
          nomenclature={nomenclature}
          imageIsDeleting
        />,
      )

      const input = testUtils.getAddImagesInput()
      expect(input).toBeDisabled()
    })
  })
})
