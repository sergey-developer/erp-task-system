import { TaskWorkGroupModel } from 'modules/task/models'
import { UserRoleEnum } from 'modules/user/constants'

import { fakeEmail, fakeId, fakePhone, fakeWord } from '_tests_/utils'

export const workGroup = (props?: Partial<Pick<TaskWorkGroupModel, 'id'>>): TaskWorkGroupModel => ({
  id: props?.id || fakeId(),

  name: fakeWord(),
  groupLead: {
    id: fakeId(),
    firstName: fakeWord(),
    lastName: fakeWord(),
    middleName: fakeWord(),
    role: UserRoleEnum.FirstLineSupport,
    email: fakeEmail(),
    phone: fakePhone(),
  },
  seniorEngineer: {
    id: fakeId(),
    firstName: fakeWord(),
    lastName: fakeWord(),
    middleName: fakeWord(),
    role: UserRoleEnum.FirstLineSupport,
    email: fakeEmail(),
    phone: fakePhone(),
  },
})
