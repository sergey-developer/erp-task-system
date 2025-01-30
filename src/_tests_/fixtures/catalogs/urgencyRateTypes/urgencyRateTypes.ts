import { UrgencyRateTypeListItemModel } from 'shared/catalogs/models/urgencyRateTypes'

import { fakeId, fakeWord } from '_tests_/utils'

export const urgencyRateTypeListItem = (): UrgencyRateTypeListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
