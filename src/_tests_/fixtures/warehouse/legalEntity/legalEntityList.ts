import { LegalEntityCatalogItemDTO } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const legalEntityListItem = (): LegalEntityCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
