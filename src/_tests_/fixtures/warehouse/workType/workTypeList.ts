import { WorkTypesCatalogItemDTO } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const workTypeListItem = (): WorkTypesCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
