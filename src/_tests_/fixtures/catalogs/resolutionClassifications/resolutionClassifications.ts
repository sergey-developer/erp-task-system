import { ResolutionClassificationListItemModel } from 'shared/catalogs/api/dto/resolutionClassifications'

import { fakeId, fakeWord } from '_tests_/utils'

export const resolutionClassificationListItem = (): ResolutionClassificationListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
