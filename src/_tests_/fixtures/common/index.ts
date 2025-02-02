import * as errorResponse from './errorResponse'
import * as pagination from './pagination'

const commonFixtures = {
  ...pagination,
  ...errorResponse,
} as const

export default commonFixtures
