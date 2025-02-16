import { LegalEntityCatalogItemDTO } from 'shared/catalogs/legalEntities/api/dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const legalEntityListItem = (): LegalEntityCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
