import times from 'lodash/times'

import { UsersGroupListItemModel, UsersGroupsModel } from 'modules/user/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const usersGroupListItem = (): UsersGroupListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  users: [fakeId()],
})

export const usersGroups = (length: number = 1): UsersGroupsModel =>
  times(length, () => usersGroupListItem())
