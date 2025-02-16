import { BaseUserType } from 'features/users/api/types'

import { fakeId, fakeUrl, fakeWord } from '_tests_/helpers'

export const baseUser = (): BaseUserType => ({
  id: fakeId(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  avatar: fakeUrl(),
})
