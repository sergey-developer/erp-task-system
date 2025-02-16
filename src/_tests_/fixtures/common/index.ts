import * as pagination from './pagination'
import * as errorResponse from './response'

const commonFixtures = {
  ...pagination,
  ...errorResponse,
} as const

export default commonFixtures
