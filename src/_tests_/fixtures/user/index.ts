import * as baseUser from './baseUser'
import * as user from './user'
import * as userActions from './userActions'
import * as users from './users'

const userFixtures = {
  ...baseUser,
  ...user,
  ...users,
  ...userActions,
} as const

export default userFixtures
