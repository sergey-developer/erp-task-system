import { UserRoleEnum } from 'modules/user/constants/roles'
import { UserModel } from 'modules/user/models'

import userFixtures from 'fixtures/user'

import { fakeEmail, fakeId, fakePhone, fakeUrl, fakeWord } from '_tests_/utils'

export const fakeUser = (
  props?: Partial<Pick<UserModel, 'role' | 'isStaff' | 'timezone'>>,
): UserModel => ({
  timezone: props?.timezone || fakeWord(),
  isStaff: props?.isStaff || false,
  role: props?.role || UserRoleEnum.FirstLineSupport,

  id: fakeId(),
  avatar: fakeUrl(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  email: fakeEmail(),
  phone: fakePhone(),
  status: userFixtures.fakeUserStatus(),
})
