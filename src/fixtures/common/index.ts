import * as commentAuthor from './commentAuthor'
import * as errorResponse from './errorResponse'
import * as pagination from './pagination'
import * as supportGroup from './supportGroup'
import * as user from './user'

const commonFixtures = {
  ...user,
  ...commentAuthor,
  ...pagination,
  ...supportGroup,
  ...errorResponse,
} as const

export default commonFixtures
