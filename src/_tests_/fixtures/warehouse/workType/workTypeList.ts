import { WorkTypeListItemModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const workTypeListItem = (): WorkTypeListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
