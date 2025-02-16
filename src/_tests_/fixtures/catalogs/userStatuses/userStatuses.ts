import { UserStatusCodeEnum } from 'shared/catalogs/userStatuses/api/constants'
import { UserStatusCatalogItemDTO } from 'shared/catalogs/userStatuses/api/dto'

import { fakeColor, fakeId, fakeWord } from '_tests_/helpers'

export const userStatus = (
  props?: Partial<Pick<UserStatusCatalogItemDTO, 'code'>>,
): UserStatusCatalogItemDTO => ({
  code: props?.code || UserStatusCodeEnum.Online,

  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
})
