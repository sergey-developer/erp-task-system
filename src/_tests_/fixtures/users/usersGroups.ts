import { UsersGroupDTO, UsersGroupsDTO } from 'features/users/api/dto'
import times from 'lodash/times'

import { fakeId, fakeWord } from '_tests_/helpers'

export const usersGroup = (): UsersGroupDTO => ({
  id: fakeId(),
  title: fakeWord(),
  users: [fakeId()],
})

export const usersGroups = (length: number = 1): UsersGroupsDTO => times(length, () => usersGroup())
