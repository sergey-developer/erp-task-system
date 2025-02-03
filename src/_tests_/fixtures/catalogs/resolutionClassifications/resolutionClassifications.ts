import { ResolutionClassificationCatalogItemDTO } from 'shared/catalogs/resolutionClassifications/api/dto/resolutionClassificationsCatalog.dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const resolutionClassificationListItem = (): ResolutionClassificationCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
