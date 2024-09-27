import { CheckEquipmentFormModalProps } from 'modules/warehouse/components/CheckEquipmentFormModal/types'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeWord } from '_tests_/utils'

export const props: Readonly<CheckEquipmentFormModalProps> = {
  open: true,
  title: fakeWord(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  isCredited: false,

  nomenclature: warehouseFixtures.nomenclature(),
  nomenclatureIsLoading: false,

  nomenclatures: [],
  nomenclaturesIsLoading: false,
  onChangeNomenclature: jest.fn(),

  locations: [],
  locationsIsLoading: false,

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
}
