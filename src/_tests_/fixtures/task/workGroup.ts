import { TaskWorkGroupModel } from 'modules/task/models'

import { fakeEmail, fakeId, fakePhone, fakeWord } from '_tests_/utils'

export const workGroup = (props?: Partial<Pick<TaskWorkGroupModel, 'id'>>): TaskWorkGroupModel => ({
  id: props?.id || fakeId(),

  name: fakeWord(),
  groupLead: {
    id: fakeId(),
    firstName: fakeWord(),
    lastName: fakeWord(),
    middleName: fakeWord(),
    position: fakeWord(),
    email: fakeEmail(),
    phone: fakePhone(),
  },
  seniorEngineer: {
    id: fakeId(),
    firstName: fakeWord(),
    lastName: fakeWord(),
    middleName: fakeWord(),
    position: fakeWord(),
    email: fakeEmail(),
    phone: fakePhone(),
  },
  members: [
    {
      id: fakeId(),
      firstName: fakeWord(),
      lastName: fakeWord(),
      middleName: fakeWord(),
    },
  ],
})
