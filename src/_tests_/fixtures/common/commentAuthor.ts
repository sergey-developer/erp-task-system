import { CommentAuthorModel } from 'shared/models/commentAuthor.model'

import { fakeId, fakeWord } from '_tests_/utils'

export const commentAuthor = (): CommentAuthorModel => ({
  id: fakeId(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
})
