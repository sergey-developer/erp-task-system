import * as baseUser from './baseUser'
import * as user from './user'
import * as users from './users'
import * as usersGroups from './usersGroups'

const userFixtures = {
  ...user,
  ...baseUser,
  ...users,
  ...usersGroups,
} as const

export default userFixtures
