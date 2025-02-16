import { UserStatusCodeEnum } from 'shared/catalogs/constants'
import { UserStatusCatalogItemDTO } from 'shared/catalogs/userStatuses/api/dto/userStatusesCatalog.dto'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const userStatus = (): UserStatusCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
  code: UserStatusCodeEnum.Online,
})
