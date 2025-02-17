import { TaskReclassificationRequestDTO } from 'features/tasks/api/dto'

import userFixtures from '_tests_/fixtures/api/data/users'
import { fakeDateString, fakeId, fakeWord } from '_tests_/helpers'

export const taskReclassificationRequest = (): TaskReclassificationRequestDTO => ({
  id: fakeId(),
  createdAt: fakeDateString(),
  comment: fakeWord(),
  user: userFixtures.baseUser(),
})
