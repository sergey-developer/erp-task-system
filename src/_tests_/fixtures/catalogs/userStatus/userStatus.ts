import { UserStatusCodeEnum } from 'shared/catalogs/constants'
import { UserStatusModel } from 'shared/catalogs/models/userStatuses'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const userStatus = (): UserStatusModel => ({
  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
  code: UserStatusCodeEnum.Online,
})
