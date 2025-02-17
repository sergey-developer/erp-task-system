import { UserDetailDTO } from 'features/users/api/dto'

import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import { fakeEmail, fakeId, fakeInteger, fakePhone, fakeUrl, fakeWord } from '_tests_/helpers'

export const userDetail = (
  props?: Partial<Pick<UserDetailDTO, 'id' | 'isStaff' | 'timezone' | 'status' | 'permissions'>>,
): UserDetailDTO => ({
  id: props?.id || fakeInteger(),
  timezone: props?.timezone || fakeWord(),
  isStaff: props?.isStaff || false,
  status: props?.status || catalogsFixtures.userStatusCatalogItem(),
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
