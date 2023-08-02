import { BaseUserModel } from 'modules/user/models'

import { fakeId, fakeUrl, fakeWord } from '_tests_/utils'

export const user = (): BaseUserModel => ({
  id: fakeId(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  avatar: fakeUrl(),
})
