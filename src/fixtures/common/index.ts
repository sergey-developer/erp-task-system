import * as commentAuthor from './commentAuthor'
import * as pagination from './pagination'
import * as supportGroup from './supportGroup'
import * as user from './user'

const commonFixtures = {
  ...user,
  ...commentAuthor,
  ...pagination,
  ...supportGroup,
}

export default commonFixtures
