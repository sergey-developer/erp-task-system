import { InfrastructureOrderFormDTO } from 'features/infrastructures/api/dto'
import isUndefined from 'lodash/isUndefined'

import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import { fakeId, fakeWord } from '_tests_/helpers'

export const infrastructureOrderForm = (
  props?: Partial<Pick<InfrastructureOrderFormDTO, 'works'>>,
): InfrastructureOrderFormDTO => ({
  works: isUndefined(props?.works) ? [] : props!.works,

  id: fakeId(),
  number: fakeWord(),
  urgencyRateType: catalogsFixtures.urgencyRateTypeCatalogItem(),
  attachments: [],
})
