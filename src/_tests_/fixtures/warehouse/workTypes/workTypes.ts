import { WorkTypesCatalogItemDTO } from 'shared/catalogs/workTypes/api/dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const workTypeListItem = (): WorkTypesCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
