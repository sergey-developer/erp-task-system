import { UserStatusCodeEnum } from 'shared/catalogs/constants'
import { UserStatusCatalogItemDTO } from 'shared/catalogs/userStatuses/api/dto/userStatusesCatalog.dto'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const userStatusListItem = (
  props?: Partial<Pick<UserStatusCatalogItemDTO, 'code'>>,
): UserStatusCatalogItemDTO => ({
  code: props?.code || UserStatusCodeEnum.Online,

  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
})
