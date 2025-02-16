import { NomenclatureDetailDTO } from 'features/nomenclatures/api/dto'

import countriesFixtures from '_tests_/fixtures/countries'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeWord } from '_tests_/helpers'

export const nomenclature = (
  props?: Partial<
    Pick<
      NomenclatureDetailDTO,
      | 'country'
      | 'group'
      | 'measurementUnit'
      | 'equipmentHasSerialNumber'
      | 'id'
      | 'title'
      | 'vendorCode'
    >
  >,
): NomenclatureDetailDTO => ({
  country: props?.country || countriesFixtures.country(),
  group: props?.group || warehouseFixtures.nomenclatureGroup(),
  measurementUnit: props?.measurementUnit || warehouseFixtures.measurementUnit(),
  equipmentHasSerialNumber: props?.equipmentHasSerialNumber || false,
  id: props?.id || fakeId(),
  title: props?.title || fakeWord(),
  vendorCode: props?.vendorCode || fakeWord(),

  shortTitle: fakeWord(),
})
