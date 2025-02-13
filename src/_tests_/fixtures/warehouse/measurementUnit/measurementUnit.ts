import { MeasurementUnitsCatalogItemDTO } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const measurementUnit = (): MeasurementUnitsCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
