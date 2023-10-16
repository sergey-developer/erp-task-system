import * as baseUser from './baseUser'
import * as user from './user'
import * as userList from './userList'

const userFixtures = {
  ...user,
  ...baseUser,
  ...userList,
} as const

export default userFixtures
