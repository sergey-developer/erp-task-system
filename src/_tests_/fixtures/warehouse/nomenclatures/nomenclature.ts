import { NomenclatureDetailDTO } from 'features/nomenclatures/api/dto'

import warehousesFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeWord } from '_tests_/helpers'

import catalogsFixtures from '../../catalogs'

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
  country: props?.country || catalogsFixtures.countryCatalogItem(),
  group: props?.group || warehousesFixtures.nomenclatureGroup(),
  measurementUnit: props?.measurementUnit || catalogsFixtures.measurementUnitCatalogItem(),
  equipmentHasSerialNumber: props?.equipmentHasSerialNumber || false,
  id: props?.id || fakeId(),
  title: props?.title || fakeWord(),
  vendorCode: props?.vendorCode || fakeWord(),

  shortTitle: fakeWord(),
})
