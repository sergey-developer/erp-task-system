import { TaskAssigneeDTO } from 'features/tasks/api/dto'

import { fakeEmail, fakeId, fakePhone, fakeUrl, fakeWord } from '_tests_/helpers'

export const assignee = (): TaskAssigneeDTO => ({
  id: fakeId(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  email: fakeEmail(),
  phone: fakePhone(),
  position: fakeWord(),
  avatar: fakeUrl(),
})
