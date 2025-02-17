import { ResolutionClassificationCatalogItemDTO } from 'shared/catalogs/resolutionClassifications/api/dto/resolutionClassificationsCatalog.dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const resolutionClassificationCatalogItem = (): ResolutionClassificationCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
