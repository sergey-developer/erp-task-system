import { generateId, generateWord } from '_tests_/utils'
import { CommentAuthorModel } from 'shared/models'

export const getCommentAuthor = (): CommentAuthorModel => ({
  id: generateId(),
  firstName: generateWord(),
  lastName: generateWord(),
  middleName: generateWord(),
})
