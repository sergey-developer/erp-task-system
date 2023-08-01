import { UserStatusModel } from 'modules/user/models'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const fakeUserStatus = (): UserStatusModel => ({
  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
})
