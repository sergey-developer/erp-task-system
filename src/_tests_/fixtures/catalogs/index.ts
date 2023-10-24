import * as subTaskTemplate from './subTaskTemplate'
import * as timeZone from './timeZone'
import * as userStatus from './userStatus'
import * as location from './location'

const catalogsFixtures = {
  ...subTaskTemplate,
  ...timeZone,
  ...userStatus,
  ...location,
} as const

export default catalogsFixtures
