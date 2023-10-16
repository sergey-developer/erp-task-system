import { UserStatusCodeEnum } from 'shared/constants/catalogs'
import { UserStatusModel } from 'shared/models/catalogs/userStatus'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const userStatus = (): UserStatusModel => ({
  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
  code: UserStatusCodeEnum.Online,
})
