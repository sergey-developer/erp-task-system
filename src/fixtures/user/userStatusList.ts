import { UserStatusListItemModel } from 'modules/user/models'

import { fakeColor, fakeId, fakeWord } from '_tests_/utils'

export const userStatusListItem = (): UserStatusListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  color: fakeColor(),
})
