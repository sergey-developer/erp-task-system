import { InfrastructureWorkTypesCatalogListItemModel } from 'shared/catalogs/api/dto/infrastructureWorkTypes'

import { fakeId, fakeWord } from '_tests_/utils'

export const infrastructureWorkTypeListItem = (): InfrastructureWorkTypesCatalogListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
