import { InfrastructureWorkTypesCatalogListItemModel } from 'shared/models/catalogs/infrastructureWorkTypes'

import { fakeId, fakeWord } from '_tests_/utils'

export const infrastructureWorkTypeListItem = (): InfrastructureWorkTypesCatalogListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
