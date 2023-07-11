import * as commentAuthor from './commentAuthor'
import * as pagination from './pagination'
import * as supportGroup from './supportGroup'
import * as user from './user'
import * as errorResponse from './errorResponse'

const commonFixtures = {
  ...user,
  ...commentAuthor,
  ...pagination,
  ...supportGroup,
  ...errorResponse,
} as const

export default commonFixtures
