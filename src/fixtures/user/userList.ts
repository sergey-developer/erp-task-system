import { UserListItemModel } from 'modules/user/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const userListItem = (): UserListItemModel => ({
  id: fakeId(),
  fullName: fakeWord(),
})
