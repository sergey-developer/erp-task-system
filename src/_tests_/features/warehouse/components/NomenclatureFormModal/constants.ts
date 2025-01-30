import { NomenclatureFormModalProps } from 'features/warehouse/components/NomenclatureFormModal/types'

import countryFixtures from '_tests_/fixtures/country/index'
import warehouseFixtures from '_tests_/fixtures/warehouse/index'
import { fakeWord } from '_tests_/utils'

export const props: Readonly<NomenclatureFormModalProps> = {
  open: true,
  isLoading: false,
  submitBtnDisabled: false,

  nomenclature: undefined,
  nomenclatureIsLoading: false,

  groups: [warehouseFixtures.nomenclatureGroupListItem()],
  groupsIsLoading: false,

  countries: [countryFixtures.countryListItem()],
  countriesIsLoading: false,

  measurementUnits: [warehouseFixtures.measurementUnitListItem()],
  measurementUnitsIsLoading: false,
  title: fakeWord(),
  okText: fakeWord(),
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

export const addModeProps: Pick<NomenclatureFormModalProps, 'okText'> = {
  okText: 'Добавить',
}

export const editModeProps: Pick<NomenclatureFormModalProps, 'okText'> = {
  okText: 'Сохранить',
}

export enum TestIdsEnum {
  NomenclatureFormModal = 'nomenclature-form-modal',
  NameFormItem = 'name-form-item',
  ShortNameFormItem = 'short-name-form-item',
  GroupFormItem = 'group-form-item',
  VendorCodeFormItem = 'vendor-code-form-item',
  MeasurementUnitFormItem = 'measurement-unit-form-item',
  CountryFormItem = 'country-form-item',
  EquipmentHasSerialNumberFormItem = 'equipment-has-serial-number-form-item',
}
