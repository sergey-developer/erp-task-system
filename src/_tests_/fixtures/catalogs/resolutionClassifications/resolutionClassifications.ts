import { ResolutionClassificationCatalogItemDTO } from 'shared/catalogs/api/dto/resolutionClassifications'

import { fakeId, fakeWord } from '_tests_/utils'

export const resolutionClassificationListItem = (): ResolutionClassificationCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
