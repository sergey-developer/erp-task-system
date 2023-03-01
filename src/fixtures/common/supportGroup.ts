import { SupportGroupModel } from 'shared/models'

import { generateId, generateWord } from '_tests_/utils'

export const getSupportGroup = (): SupportGroupModel => ({
  id: generateId(),
  name: generateWord(),
})
