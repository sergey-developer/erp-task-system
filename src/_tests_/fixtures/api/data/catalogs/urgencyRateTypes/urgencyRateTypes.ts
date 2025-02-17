import { UrgencyRateTypeCatalogItemDTO } from 'shared/catalogs/urgencyRateTypes/api/dto/urgencyRateTypesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const urgencyRateTypeCatalogItem = (): UrgencyRateTypeCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
