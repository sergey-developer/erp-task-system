import * as baseUser from './baseUser'
import * as user from './user'
import * as users from './users'
import * as usersGroups from './usersGroups'
import * as userActions from './userActions'

const userFixtures = {
  ...baseUser,
  ...usersGroups,
  ...user,
  ...users,
  ...userActions,
} as const

export default userFixtures
