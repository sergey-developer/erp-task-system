import { UrgencyRateTypeCatalogItemDTO } from 'shared/catalogs/api/dto/urgencyRateTypes'

import { fakeId, fakeWord } from '_tests_/utils'

export const urgencyRateTypeListItem = (): UrgencyRateTypeCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
