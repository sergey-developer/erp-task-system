import { UrgencyRateTypeListItemModel } from 'shared/catalogs/api/dto/urgencyRateTypes'

import { fakeId, fakeWord } from '_tests_/utils'

export const urgencyRateTypeListItem = (): UrgencyRateTypeListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
