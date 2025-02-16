import { InfrastructureWorkTypesCatalogItemDTO } from 'shared/catalogs/infrastructureWorkTypes/api/dto/infrastructureWorkTypesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const infrastructureWorkType = (): InfrastructureWorkTypesCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
