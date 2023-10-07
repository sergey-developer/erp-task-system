import { UserStatusCodeEnum } from 'shared/constants/catalogs'
import { UserStatusListItemModel } from 'shared/models/catalogs/userStatus'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const userStatusListItem = (
  props?: Partial<Pick<UserStatusListItemModel, 'code'>>,
): UserStatusListItemModel => ({
  code: props?.code || UserStatusCodeEnum.Online,

  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
})
