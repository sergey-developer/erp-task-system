import { SupportGroupModel } from 'shared/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const getSupportGroup = (): SupportGroupModel => ({
  id: fakeId(),
  name: fakeWord(),
})
