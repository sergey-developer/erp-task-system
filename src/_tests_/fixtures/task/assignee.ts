import { TaskAssigneeModel } from 'modules/task/models'

import { fakeEmail, fakeId, fakePhone, fakeUrl, fakeWord } from '_tests_/utils'

export const assignee = (): TaskAssigneeModel => ({
  id: fakeId(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  email: fakeEmail(),
  phone: fakePhone(),
  position: fakeWord(),
  avatar: fakeUrl(),
})
