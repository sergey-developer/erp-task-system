import { InfrastructureWorkTypesCatalogItemDTO } from 'shared/catalogs/api/dto/infrastructureWorkTypes'

import { fakeId, fakeWord } from '_tests_/utils'

export const infrastructureWorkTypeListItem = (): InfrastructureWorkTypesCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
