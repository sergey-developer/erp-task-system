import { WorkTypeListItemModel } from "modules/warehouse/models";

import { fakeInteger, fakeWord } from '_tests_/utils'

export const workTypeListItem = (): WorkTypeListItemModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
