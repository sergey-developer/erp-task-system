import { generateId, generateWord } from '_tests_/utils'
import { SupportGroupModel } from 'shared/models'

export const getSupportGroup = (): SupportGroupModel => ({
  id: generateId(),
  name: generateWord(),
})
