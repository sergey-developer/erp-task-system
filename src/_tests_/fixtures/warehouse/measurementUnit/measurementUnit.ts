import { MeasurementUnitsCatalogItemDTO } from 'shared/catalogs/measurementUnits/api/dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const measurementUnit = (): MeasurementUnitsCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
