import * as commentAuthor from './commentAuthor'
import * as pagination from './pagination'
import * as user from './user'

const commonFixtures = {
  ...user,
  ...commentAuthor,
  ...pagination,
}

export default commonFixtures
