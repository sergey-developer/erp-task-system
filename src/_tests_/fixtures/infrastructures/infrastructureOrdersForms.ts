import isUndefined from 'lodash/isUndefined'

import { InfrastructureOrderFormListItemModel } from 'features/infrastructures/models'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import { fakeId, fakeWord } from '_tests_/utils'

export const infrastructureOrderFormListItemModel = (
  props?: Partial<Pick<InfrastructureOrderFormListItemModel, 'works'>>,
): InfrastructureOrderFormListItemModel => ({
  works: isUndefined(props?.works) ? [] : props!.works,

  id: fakeId(),
  number: fakeWord(),
  urgencyRateType: catalogsFixtures.urgencyRateTypeListItem(),
  attachments: [],
})
