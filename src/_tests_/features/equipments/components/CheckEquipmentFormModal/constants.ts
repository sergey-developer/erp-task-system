import { CheckEquipmentFormModalProps } from 'features/equipments/components/CheckEquipmentFormModal/types'

import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'
import nomenclaturesFixtures from '_tests_/fixtures/api/data/nomenclatures'
import { fakeWord } from '_tests_/helpers'

export const props: Readonly<CheckEquipmentFormModalProps> = {
  open: true,
  title: fakeWord(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  isCredited: false,

  nomenclature: nomenclaturesFixtures.nomenclatureDetail(),
  nomenclatureIsLoading: false,

  nomenclatures: [],
  nomenclaturesIsLoading: false,
  onChangeNomenclature: jest.fn(),

  locations: [],
  locationsIsLoading: false,

  categories: [],
  categoriesIsLoading: false,
  category: equipmentsFixtures.equipmentCategory(),
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
