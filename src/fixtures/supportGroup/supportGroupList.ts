import { SupportGroupListItemModel } from 'modules/supportGroup/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const fakeSupportGroupListItem = (): SupportGroupListItemModel => ({
  id: fakeId(),
  name: fakeWord(),
})
