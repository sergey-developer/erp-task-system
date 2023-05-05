import { UserRoleEnum } from 'modules/user/constants/roles'
import { UserProfileModel } from 'modules/user/models'

import { fakeEmail, fakeId, fakePhone, fakeUrl, fakeWord } from '_tests_/utils'

export const fakeUserProfile = (
  props?: Partial<Pick<UserProfileModel, 'role' | 'isStaff'>>,
): UserProfileModel => ({
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
