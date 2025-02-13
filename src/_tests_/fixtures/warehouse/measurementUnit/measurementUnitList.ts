import { MeasurementUnitsCatalogItemDTO } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const measurementUnitListItem = (): MeasurementUnitsCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
