import { MeasurementUnitsCatalogItemDTO } from 'shared/catalogs/measurementUnits/api/dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const measurementUnitCatalogItem = (): MeasurementUnitsCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
