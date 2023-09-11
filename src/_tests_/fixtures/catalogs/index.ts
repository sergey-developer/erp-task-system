import * as subTaskTemplate from './subTaskTemplate'
import * as timeZone from './timeZone'
import * as userStatus from './userStatus'

const catalogsFixtures = {
  ...subTaskTemplate,
  ...timeZone,
  ...userStatus,
} as const

export default catalogsFixtures
