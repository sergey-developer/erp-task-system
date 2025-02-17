import { WorkTypesCatalogItemDTO } from 'shared/catalogs/workTypes/api/dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const workTypeCatalogItem = (): WorkTypesCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
