import * as user from './user'
import * as userList from './userList'
import * as userStatus from './userStatus'
import * as userStatusList from './userStatusList'

const userFixtures = {
  ...user,
  ...userList,
  ...userStatus,
  ...userStatusList,
} as const

export default userFixtures
