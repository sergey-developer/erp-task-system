import { UserModel } from 'modules/user/models'

import { fakeId, fakeUrl, fakeWord } from '_tests_/utils'

export const getUser = (): UserModel => ({
  id: fakeId(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  avatar: fakeUrl(),
})
