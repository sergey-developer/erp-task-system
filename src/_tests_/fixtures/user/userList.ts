import times from 'lodash/times'

import { UserListItemModel, UserListModel } from 'modules/user/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const userListItem = (): UserListItemModel => ({
  id: fakeId(),
  fullName: fakeWord(),
})

export const userList = (length: number = 1): UserListModel => times(length, () => userListItem())
