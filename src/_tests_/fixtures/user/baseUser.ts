import { BaseUserModel } from 'features/user/api/dto'

import { fakeId, fakeUrl, fakeWord } from '_tests_/utils'

export const baseUser = (): BaseUserModel => ({
  id: fakeId(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  avatar: fakeUrl(),
})
