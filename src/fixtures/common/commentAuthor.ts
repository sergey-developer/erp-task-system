import { CommentAuthorModel } from 'shared/models'

import { generateId, generateWord } from '_tests_/utils'

export const getCommentAuthor = (): CommentAuthorModel => ({
  id: generateId(),
  firstName: generateWord(),
  lastName: generateWord(),
  middleName: generateWord(),
})
