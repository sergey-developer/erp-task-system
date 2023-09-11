import * as user from './user'
import * as userList from './userList'

const userFixtures = {
  ...user,
  ...userList,
} as const

export default userFixtures
