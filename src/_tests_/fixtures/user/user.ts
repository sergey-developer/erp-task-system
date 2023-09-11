import { UserRoleEnum } from 'modules/user/constants'
import { UserModel } from 'modules/user/models'

import catalogsFixtures from '_tests_/fixtures/catalogs'

import { fakeEmail, fakeId, fakePhone, fakeUrl, fakeWord } from '_tests_/utils'

export const user = (
  props?: Partial<Pick<UserModel, 'role' | 'isStaff' | 'timezone' | 'status' | 'permissions'>>,
): UserModel => ({
  timezone: props?.timezone || fakeWord(),
  isStaff: props?.isStaff || false,
  role: props?.role || UserRoleEnum.FirstLineSupport,
  status: props?.status || catalogsFixtures.userStatus(),
  permissions: props?.permissions || [],

  id: fakeId(),
  avatar: fakeUrl(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  fullName: fakeWord(),
  email: fakeEmail(),
  phone: fakePhone(),
})
