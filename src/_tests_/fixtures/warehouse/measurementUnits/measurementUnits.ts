import { MeasurementUnitsCatalogItemDTO } from 'shared/catalogs/measurementUnits/api/dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const measurementUnitListItem = (): MeasurementUnitsCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
