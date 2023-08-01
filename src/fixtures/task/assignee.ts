import { TaskAssigneeModel } from 'modules/task/models'

import { fakeId, fakeUrl, fakeWord } from '_tests_/utils'

export const assignee = (): TaskAssigneeModel => ({
  id: fakeId(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  avatar: fakeUrl(),
})
