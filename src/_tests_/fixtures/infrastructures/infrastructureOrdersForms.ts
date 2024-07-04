import { InfrastructureOrderFormListItemModel } from 'modules/infrastructures/models'

import { fakeId, fakeWord } from '_tests_/utils'

import { urgencyRateType } from './urgencyRateType'

export const infrastructureOrderFormListItemModel = (): InfrastructureOrderFormListItemModel => ({
  id: fakeId(),
  number: fakeWord(),
  urgencyRateType: urgencyRateType(),
  attachments: null,
})
