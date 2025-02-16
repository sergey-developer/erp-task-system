import { SupportGroupDTO } from 'shared/supportGroups/api/dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const supportGroup = (): SupportGroupDTO => ({
  id: fakeId(),
  name: fakeWord(),
})
