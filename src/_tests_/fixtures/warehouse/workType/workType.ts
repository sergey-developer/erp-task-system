import { WorkTypeModel } from 'modules/warehouse/models'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const workType = (): WorkTypeModel => ({
  id: fakeInteger(),
  title: fakeWord(),
  actions: null,
})
