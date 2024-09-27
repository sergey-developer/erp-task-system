import { NomenclatureModel } from 'modules/warehouse/models'

import countryFixtures from '_tests_/fixtures/country'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeWord } from '_tests_/utils'

export const nomenclature = (
  props?: Partial<
    Pick<
      NomenclatureModel,
      | 'country'
      | 'group'
      | 'measurementUnit'
      | 'equipmentHasSerialNumber'
      | 'id'
      | 'title'
      | 'vendorCode'
    >
  >,
): NomenclatureModel => ({
  country: props?.country || countryFixtures.country(),
  group: props?.group || warehouseFixtures.nomenclatureGroup(),
  measurementUnit: props?.measurementUnit || warehouseFixtures.measurementUnit(),
  equipmentHasSerialNumber: props?.equipmentHasSerialNumber || false,
  id: props?.id || fakeId(),
  title: props?.title || fakeWord(),
  vendorCode: props?.vendorCode || fakeWord(),

  shortTitle: fakeWord(),
})
