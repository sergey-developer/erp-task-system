import { UserModel } from 'modules/user/models'

import { generateId, generateUrl, generateWord } from '_tests_/utils'

export const getUser = (): UserModel => ({
  id: generateId(),
  firstName: generateWord(),
  lastName: generateWord(),
  middleName: generateWord(),
  avatar: generateUrl(),
})
