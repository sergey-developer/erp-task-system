import { WorkTypeListItemModel } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const workTypeListItem = (): WorkTypeListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
