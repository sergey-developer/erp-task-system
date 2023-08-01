import { SupportGroupModel } from 'modules/supportGroup/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const fakeSupportGroup = (): SupportGroupModel => ({
  id: fakeId(),
  name: fakeWord(),
})
