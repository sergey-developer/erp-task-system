import * as commentAuthor from './commentAuthor'
import * as pagination from './pagination'

const commonFixtures = {
  ...commentAuthor,
  ...pagination,
} as const

export default commonFixtures
