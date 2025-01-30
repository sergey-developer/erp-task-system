import { TaskReclassificationRequestModel } from 'features/task/models'

import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const reclassificationRequest = (): TaskReclassificationRequestModel => ({
  id: fakeId(),
  createdAt: fakeDateString(),
  comment: fakeWord(),
  user: userFixtures.baseUser(),
})
