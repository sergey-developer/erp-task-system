import { generateId, generateWord } from '_tests_/utils'
import { BaseTaskModel } from 'modules/task/models'

export const getSupportGroup = (): BaseTaskModel['supportGroup'] => ({
  id: generateId(),
  name: generateWord(),
})
