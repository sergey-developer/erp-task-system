import * as user from './user'
import * as userStatusList from './userStatusList'

const userFixtures = {
  ...user,
  ...userStatusList,
} as const

export default userFixtures
