import { NomenclatureModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const nomenclatureGroup = (
  props?: Partial<Pick<NomenclatureModel['group'], 'id'>>,
): NomenclatureModel['group'] => ({
  title: fakeWord(),

  id: props?.id || fakeId(),
})

export const nomenclatureCountry = (
  props?: Partial<Pick<NonNullable<NomenclatureModel['country']>, 'id'>>,
): NomenclatureModel['country'] => ({
  title: fakeWord(),

  id: props?.id || fakeId(),
})

export const nomenclatureMeasurementUnit = (
  props?: Partial<Pick<NomenclatureModel['measurementUnit'], 'id'>>,
): NomenclatureModel['measurementUnit'] => ({
  title: fakeWord(),

  id: props?.id || fakeId(),
})

export const nomenclature = (
  props?: Partial<NomenclatureModel>,
): NomenclatureModel => ({
  id: fakeId(),
  title: fakeWord(),
  shortTitle: fakeWord(),
  vendorCode: fakeWord(),
  equipmentHasSerialNumber: false,

  country: props?.country || nomenclatureCountry(),
  group: props?.group || nomenclatureGroup(),
  measurementUnit: props?.measurementUnit || nomenclatureMeasurementUnit(),
})
