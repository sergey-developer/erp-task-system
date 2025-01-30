import { InfrastructureWorkTypesCatalogListItemModel } from 'shared/catalogs/models/infrastructureWorkTypes'

import { fakeId, fakeWord } from '_tests_/utils'

export const infrastructureWorkTypeListItem = (): InfrastructureWorkTypesCatalogListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
