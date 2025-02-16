import * as baseUser from './baseUser'
import * as user from './user'
import * as userActions from './userActions'
import * as users from './users'
import * as usersGroups from './usersGroups'

const userFixtures = {
  ...baseUser,
  ...user,
  ...users,
  ...userActions,
  ...usersGroups,
} as const

export default userFixtures
