import { UserDTO, UsersDTO } from 'features/users/api/dto'
import times from 'lodash/times'

import { fakeId, fakeWord } from '_tests_/utils'

export const userListItem = (props?: Partial<Pick<UserDTO, 'id'>>): UserDTO => ({
  id: props?.id || fakeId(),

  fullName: fakeWord(),
})

export const users = (length: number = 1): UsersDTO => times(length, () => userListItem())
