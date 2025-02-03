import { InfrastructureWorkTypesCatalogItemDTO } from 'shared/catalogs/infrastructureWorkTypes/api/dto/infrastructureWorkTypesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const infrastructureWorkTypeListItem = (): InfrastructureWorkTypesCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
