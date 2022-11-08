import { generateId, generateWord } from '_tests_/utils'
import { BaseUserModel } from 'modules/user/models'

export const getBaseUser = (): BaseUserModel => ({
  id: generateId(),
  firstName: generateWord(),
  lastName: generateWord(),
  middleName: generateWord(),
})
