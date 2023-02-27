import { BaseTaskModel } from 'modules/task/models'

import { generateId, generateWord } from '_tests_/utils'

export const getSupportGroup = (): BaseTaskModel['supportGroup'] => ({
  id: generateId(),
  name: generateWord(),
})
