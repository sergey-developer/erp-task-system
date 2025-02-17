import { InfrastructureWorkTypesCatalogItemDTO } from 'shared/catalogs/infrastructureWorkTypes/api/dto/infrastructureWorkTypesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const infrastructureWorkTypeCatalogItem = (): InfrastructureWorkTypesCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
