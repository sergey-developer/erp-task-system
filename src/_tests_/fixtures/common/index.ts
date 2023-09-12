import * as commentAuthor from './commentAuthor'
import * as errorResponse from './errorResponse'
import * as pagination from './pagination'

const commonFixtures = {
  ...commentAuthor,
  ...pagination,
  ...errorResponse,
} as const

export default commonFixtures
