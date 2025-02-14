import { EquipmentFilterProps } from 'features/equipments/components/EquipmentFilter/types'

import catalogsFixtures from '_tests_/fixtures/catalogs/index'
import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const props: Readonly<EquipmentFilterProps> = {
  visible: true,

  values: {},
  initialValues: {},

  locations: catalogsFixtures.locationsCatalog(2),
  locationsIsLoading: false,

  categories: warehouseFixtures.equipmentCategoryList(2),
  categoriesIsLoading: false,

  owners: warehouseFixtures.customerList(2),
  ownersIsLoading: false,

  onClose: jest.fn(),
  onApply: jest.fn(),
}

export enum TestIdsEnum {
  EquipmentFilter = 'equipment-filter',
  Conditions = 'conditions',
  ConditionsSelect = 'conditions-select',
  Locations = 'locations',
  LocationsSelect = 'locations-select',
  Owners = 'owners',
  OwnersSelect = 'owners-select',
  Categories = 'categories',
  CategoriesSelect = 'categories-select',
  Price = 'price',
  IsNew = 'is-new',
  IsWarranty = 'is-warranty',
  IsRepaired = 'is-repaired',
  ZeroQuantity = 'zero-quantity',
}
