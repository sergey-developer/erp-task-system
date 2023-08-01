import { UserRoleEnum } from 'modules/user/constants'
import { UserModel } from 'modules/user/models'

import userFixtures from 'fixtures/user'

import { fakeEmail, fakeId, fakePhone, fakeUrl, fakeWord } from '_tests_/utils'

export const user = (
  props?: Partial<Pick<UserModel, 'role' | 'isStaff' | 'timezone' | 'status'>>,
): UserModel => ({
  timezone: props?.timezone || fakeWord(),
  isStaff: props?.isStaff || false,
  role: props?.role || UserRoleEnum.FirstLineSupport,
  status: props?.status || userFixtures.userStatus(),

  id: fakeId(),
  avatar: fakeUrl(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  email: fakeEmail(),
  phone: fakePhone(),
})
