import { generateId, generateWord } from '_tests_/utils'
import { UserModel } from 'modules/user/models'

export const getUser = (): UserModel => ({
  id: generateId(),
  firstName: generateWord(),
  lastName: generateWord(),
  middleName: generateWord(),
  avatar: '',
})
