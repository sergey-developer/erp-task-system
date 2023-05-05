import { UserRoleEnum } from 'modules/user/constants/roles'
import { UserModel } from 'modules/user/models'

import { fakeEmail, fakeId, fakePhone, fakeUrl, fakeWord } from '_tests_/utils'

export const fakeUser = (
  props?: Partial<Pick<UserModel, 'role' | 'isStaff'>>,
): UserModel => ({
  id: fakeId(),
  avatar: fakeUrl(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  email: fakeEmail(),
  phone: fakePhone(),
  timezone: fakeWord(),

  isStaff: props?.isStaff || false,
  role: props?.role || UserRoleEnum.FirstLineSupport,
})
