import { UserStatusListItemModel } from 'shared/models/catalogs/userStatus'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const userStatusListItem = (): UserStatusListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
})
