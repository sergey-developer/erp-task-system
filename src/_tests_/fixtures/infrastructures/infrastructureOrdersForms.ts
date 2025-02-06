import { InfrastructureOrderFormDTO } from 'features/infrastructures/api/dto'
import isUndefined from 'lodash/isUndefined'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import { fakeId, fakeWord } from '_tests_/utils'

export const infrastructureOrderFormListItemModel = (
  props?: Partial<Pick<InfrastructureOrderFormDTO, 'works'>>,
): InfrastructureOrderFormDTO => ({
  works: isUndefined(props?.works) ? [] : props!.works,

  id: fakeId(),
  number: fakeWord(),
  urgencyRateType: catalogsFixtures.urgencyRateTypeListItem(),
  attachments: [],
})
