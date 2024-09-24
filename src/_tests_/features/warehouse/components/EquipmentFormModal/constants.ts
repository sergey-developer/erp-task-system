import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'
import { fakeWord } from '_tests_/utils/index'

export const props: Readonly<EquipmentFormModalProps> = {
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

export const addModeProps: Readonly<Pick<EquipmentFormModalProps, 'okText'>> = {
  okText: 'Добавить',
}

export enum TestIdsEnum {
  EquipmentFormModal = 'equipment-form-modal',
  CategoryFormItem = 'category-form-item',
  NomenclaturesFormItem = 'nomenclatures-form-item',
  TitleFormItem = 'title-form-item',
  InventoryNumberFormItem = 'inventory-number-form-item',
  SerialNumberFormItem = 'serial-number-form-item',
  ConditionFormItem = 'condition-form-item',
  QuantityFormItem = 'quantity-form-item',
  MeasurementUnitFormItem = 'measurement-unit-form-item',
  PriceFormItem = 'price-form-item',
  CurrencyFormItem = 'currency-form-item',
  IsNewFormItem = 'is-new-form-item',
  IsWarrantyFormItem = 'is-warranty-form-item',
  IsRepairedFormItem = 'is-repaired-form-item',
  UsageCounterFormItem = 'usage-counter-form-item',
  OwnerIsObermeisterFormItem = 'owner-is-obermeister-form-item',
  OwnerFormItem = 'owner-form-item',
  MacroregionFormItem = 'macroregion-form-item',
  PurposeFormItem = 'purpose-form-item',
  CommentFormItem = 'comment-form-item',
  ImagesFormItem = 'images-form-item',
}
