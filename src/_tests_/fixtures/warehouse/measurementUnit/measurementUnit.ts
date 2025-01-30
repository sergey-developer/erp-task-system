import { MeasurementUnitModel } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const measurementUnit = (): MeasurementUnitModel => ({
  id: fakeId(),
  title: fakeWord(),
})
