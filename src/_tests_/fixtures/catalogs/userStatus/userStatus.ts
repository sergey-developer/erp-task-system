import { UserStatusDTO } from 'shared/catalogs/api/dto/userStatuses'
import { UserStatusCodeEnum } from 'shared/catalogs/constants'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const userStatus = (): UserStatusDTO => ({
  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
  code: UserStatusCodeEnum.Online,
})
