import * as commentAuthor from './commentAuthor'
import * as pagination from './pagination'
import * as user from './user'

export const commonFixtures = {
  ...user,
  ...commentAuthor,
  ...pagination,
}
