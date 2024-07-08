import isUndefined from 'lodash/isUndefined'

import { InfrastructureOrderFormListItemModel } from 'modules/infrastructures/models'

import { fakeId, fakeWord } from '_tests_/utils'

import { urgencyRateType } from './urgencyRateType'

export const infrastructureOrderFormListItemModel = (
  props?: Partial<Pick<InfrastructureOrderFormListItemModel, 'works'>>,
): InfrastructureOrderFormListItemModel => ({
  works: isUndefined(props?.works) ? [] : props!.works,

  id: fakeId(),
  number: fakeWord(),
  urgencyRateType: urgencyRateType(),
  attachments: [],
})
