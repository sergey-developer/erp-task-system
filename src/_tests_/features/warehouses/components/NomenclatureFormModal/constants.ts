import { NomenclatureFormModalProps } from 'features/nomenclatures/components/NomenclatureFormModal/types'

import nomenclaturesFixtures from '_tests_/fixtures/api/data/nomenclatures'
import { fakeWord } from '_tests_/helpers'

import catalogsFixtures from '../../../../fixtures/api/data/catalogs'

export const props: Readonly<NomenclatureFormModalProps> = {
  open: true,
  isLoading: false,
  submitBtnDisabled: false,

  nomenclature: undefined,
  nomenclatureIsLoading: false,

  groups: [nomenclaturesFixtures.nomenclatureGroup()],
  groupsIsLoading: false,

  countries: [catalogsFixtures.countryCatalogItem()],
  countriesIsLoading: false,

  measurementUnits: [catalogsFixtures.measurementUnitCatalogItem()],
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
