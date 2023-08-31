import { NomenclatureModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

import warehouseFixtures from './index'

export const nomenclature = (
  props?: Partial<
    Pick<
      NomenclatureModel,
      'country' | 'group' | 'measurementUnit' | 'equipmentHasSerialNumber'
    >
  >,
): NomenclatureModel => ({
  country: props?.country || warehouseFixtures.country(),
  group: props?.group || warehouseFixtures.nomenclatureGroup(),
  measurementUnit:
    props?.measurementUnit || warehouseFixtures.measurementUnit(),
  equipmentHasSerialNumber: props?.equipmentHasSerialNumber || false,

  id: fakeId(),
  title: fakeWord(),
  shortTitle: fakeWord(),
  vendorCode: fakeWord(),
})
