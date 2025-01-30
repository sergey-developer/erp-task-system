import { MeasurementUnitListItemModel } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const measurementUnitListItem = (): MeasurementUnitListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
