import { BaseTaskModel } from 'modules/task/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const fakeSupportGroup = (): BaseTaskModel['supportGroup'] => ({
  id: fakeId(),
  name: fakeWord(),
})
