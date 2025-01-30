import { UserStatusCodeEnum } from 'shared/catalogs/constants'
import { UserStatusListItemModel } from 'shared/catalogs/models/userStatuses'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const userStatusListItem = (
  props?: Partial<Pick<UserStatusListItemModel, 'code'>>,
): UserStatusListItemModel => ({
  code: props?.code || UserStatusCodeEnum.Online,

  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
})
