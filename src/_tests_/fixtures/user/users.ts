import times from 'lodash/times'

import { UserListItemModel, UsersModel } from 'modules/user/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const userListItem = (): UserListItemModel => ({
  id: fakeId(),
  fullName: fakeWord(),
})

export const users = (length: number = 1): UsersModel => times(length, () => userListItem())
