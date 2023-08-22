import { LegalEntityListItemModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const legalEntityListItem = (): LegalEntityListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
