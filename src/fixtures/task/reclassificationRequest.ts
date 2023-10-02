import commonFixtures from 'fixtures/common'

import { TaskReclassificationRequestModel } from 'modules/task/models'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const reclassificationRequest = (): TaskReclassificationRequestModel => ({
  id: fakeId(),
  createdAt: fakeDateString(),
  comment: fakeWord(),
  user: commonFixtures.user(),
})
