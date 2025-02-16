import { UrgencyRateTypeCatalogItemDTO } from 'shared/catalogs/urgencyRateTypes/api/dto/urgencyRateTypesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const urgencyRateType = (): UrgencyRateTypeCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
