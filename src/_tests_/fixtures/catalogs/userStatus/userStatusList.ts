import { UserStatusCatalogItemDTO } from 'shared/catalogs/api/dto/userStatuses'
import { UserStatusCodeEnum } from 'shared/catalogs/constants'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const userStatusListItem = (
  props?: Partial<Pick<UserStatusCatalogItemDTO, 'code'>>,
): UserStatusCatalogItemDTO => ({
  code: props?.code || UserStatusCodeEnum.Online,

  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
})
