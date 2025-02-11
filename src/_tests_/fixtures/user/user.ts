import { UserDetailDTO } from 'features/users/api/dto'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import { fakeEmail, fakeId, fakeInteger, fakePhone, fakeUrl, fakeWord } from '_tests_/utils'

export const user = (
  props?: Partial<Pick<UserDetailDTO, 'id' | 'isStaff' | 'timezone' | 'status' | 'permissions'>>,
): UserDetailDTO => ({
  id: props?.id || fakeInteger(),
  timezone: props?.timezone || fakeWord(),
  isStaff: props?.isStaff || false,
  status: props?.status || catalogsFixtures.userStatus(),
  permissions: props?.permissions || [],

  avatar: fakeUrl(),
  firstName: fakeWord(),
  lastName: fakeWord(),
  middleName: fakeWord(),
  fullName: fakeWord(),
  email: fakeEmail(),
  phone: fakePhone(),
  position: { id: fakeId(), title: fakeWord() },
})
