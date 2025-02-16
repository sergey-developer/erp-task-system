import * as baseUser from './baseUser'
import * as userActions from './userActions'
import * as userDetail from './userDetail'
import * as users from './users'
import * as usersGroups from './usersGroups'

const userFixtures = {
  ...baseUser,
  ...userDetail,
  ...users,
  ...userActions,
  ...usersGroups,
} as const

export default userFixtures
