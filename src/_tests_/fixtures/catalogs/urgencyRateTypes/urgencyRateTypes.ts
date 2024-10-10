import { UrgencyRateTypeListItemModel } from 'shared/models/catalogs/urgencyRateTypes'

import { fakeId, fakeWord } from '_tests_/utils'

export const urgencyRateTypeListItem = (): UrgencyRateTypeListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
