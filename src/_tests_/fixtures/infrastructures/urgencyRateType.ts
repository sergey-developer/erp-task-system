import { UrgencyRateTypeModel } from 'modules/infrastructures/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const urgencyRateType = (): UrgencyRateTypeModel => ({
  id: fakeId(),
  title: fakeWord(),
})
