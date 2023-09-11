import { SupportGroupModel } from 'modules/supportGroup/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const supportGroup = (): SupportGroupModel => ({
  id: fakeId(),
  name: fakeWord(),
})
