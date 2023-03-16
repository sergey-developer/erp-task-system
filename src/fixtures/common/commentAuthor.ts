import { CommentAuthorModel } from 'shared/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const getCommentAuthor = (): CommentAuthorModel => ({
  id: fakeId(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
})
