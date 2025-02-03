import { UrgencyRateTypeCatalogItemDTO } from 'shared/catalogs/urgencyRateTypes/api/dto/urgencyRateTypesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const urgencyRateTypeListItem = (): UrgencyRateTypeCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
