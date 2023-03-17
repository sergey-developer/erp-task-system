import { BaseTaskModel } from 'modules/task/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const getSupportGroup = (): BaseTaskModel['supportGroup'] => ({
  id: fakeId(),
  name: fakeWord(),
})
