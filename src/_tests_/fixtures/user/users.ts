import { UserListItemModel, UsersModel } from 'features/user/api/dto'
import times from 'lodash/times'

import { fakeId, fakeWord } from '_tests_/utils'

export const userListItem = (
  props?: Partial<Pick<UserListItemModel, 'id'>>,
): UserListItemModel => ({
  id: props?.id || fakeId(),

  fullName: fakeWord(),
})

export const users = (length: number = 1): UsersModel => times(length, () => userListItem())
