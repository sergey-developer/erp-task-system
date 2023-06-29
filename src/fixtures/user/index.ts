import * as user from './user'
import * as userStatus from './userStatus'
import * as userStatusList from './userStatusList'

const userFixtures = {
  ...user,
  ...userStatus,
  ...userStatusList,
} as const

export default userFixtures
