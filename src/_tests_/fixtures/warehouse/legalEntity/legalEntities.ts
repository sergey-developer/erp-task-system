import { LegalEntityCatalogItemDTO } from 'shared/catalogs/legalEntities/api/dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const legalEntityListItem = (): LegalEntityCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
